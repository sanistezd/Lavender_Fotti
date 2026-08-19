'use client';
import { useEffect, useState, useRef } from 'react';

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(newFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};
import styles from './OrderModal.module.css';
import { X, ImagePlus, Sparkles, ArrowRight, FileImage, Trash2, Send, Mail, Lock } from 'lucide-react';

const VkIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.77 17.29h.31v-3.57c2.01.2 3.53 1.67 4.14 3.57h2.84c-.78-2.84-2.83-4.41-4.11-5.01 1.28-.74 3.08-2.54 3.51-4.98h-2.58c-.56 1.98-2.22 3.78-3.8 3.95V7.3H10.5v6.92c-1.6-.4-3.62-2.34-3.71-6.92H4.05c.13 6.24 3.25 9.99 8.72 9.99Z" />
  </svg>
);

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function OrderModal({ isOpen, onClose, serviceName }: OrderModalProps) {
  const [files, setFiles] = useState<{file: File, name: string, preview: string}[]>([]);
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'after'
  const [contactMethod, setContactMethod] = useState<'telegram' | 'vk' | 'email'>('telegram');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFiles([]); // Reset files when modal opens
      setIsSubmitted(false);
      setDescription('');
      setContactInfo('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPremium = serviceName?.includes('Premium');
  
  let maxFiles = 10;
  if (isPremium) maxFiles = 3;
  if (serviceName?.includes('Быстрое')) maxFiles = 1;
  if (serviceName?.includes('Редактирование')) maxFiles = 5;

  let basePrice = 0;
  if (isPremium) basePrice = 3290;
  else if (serviceName?.includes('Быстрое')) basePrice = 1390;
  else if (serviceName?.includes('Редактирование')) basePrice = 1090;

  let totalPrice = basePrice;
  if (serviceName?.includes('Редактирование') && files.length > 2) {
    totalPrice += (files.length - 2) * 175;
  }

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        name: file.name,
        preview: URL.createObjectURL(file)
      }));
      
      setFiles(prev => {
        const combined = [...prev, ...newFiles];
        if (combined.length > maxFiles) {
          alert(`Для услуги «${serviceName}» можно загрузить не более ${maxFiles} фотографий.`);
          return combined.slice(0, maxFiles);
        }
        return combined;
      });
    }
  };

  const removeFile = (indexToRemove) => {
    const fileToRemove = files[indexToRemove];
    if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!contactInfo) {
      alert('Пожалуйста, укажите контакт для связи.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('service', serviceName || 'Не указана');
      formData.append('description', description);
      formData.append('contactMethod', contactMethod);
      formData.append('contactInfo', contactInfo);
      formData.append('price', totalPrice.toLocaleString('ru-RU'));
      
      const compressedFiles = await Promise.all(
        files.map(async (f) => await compressImage(f.file))
      );

      compressedFiles.forEach((file, i) => {
        formData.append(`file${i}`, file);
      });

      const res = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.confirmation_url) {
          window.location.href = data.confirmation_url;
        } else {
          setIsSubmitted(true);
        }
      } else {
        const errData = await res.text();
        console.error('Submit error:', errData);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (e) {
      console.error(e);
      alert('Произошла ошибка при отправке заявки. Проверьте подключение к интернету.');
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>
              <Sparkles size={48} className={styles.star} />
            </div>
            {serviceName?.includes('Индивидуальный') ? (
              <>
                <h2>Спасибо за заявку!</h2>
                <p className={styles.successSubtext}>
                  В ближайшее время мы свяжемся с вами по указанному контакту ({contactInfo}), чтобы обсудить детали индивидуального заказа.
                </p>
              </>
            ) : (
              <>
                <h2>Спасибо за ваш заказ!</h2>
                <p>Мы получили вашу заявку.</p>
                <p className={styles.successSubtext}>
                  В ближайшее время мы свяжемся с вами по указанному контакту ({contactInfo}), чтобы подтвердить детали заказа.
                </p>
              </>
            )}
            <button className={styles.submitBtn} onClick={onClose}>
              Вернуться на сайт
            </button>
          </div>
        ) : (
          <>
            <header className={styles.header}>
              <img src="/mascot.png" alt="Mascot" className={styles.mascot} />
              <div className={styles.headerText}>
                <h2 className={styles.title}>{serviceName}</h2>
                <p className={styles.subtitle}>Оформление заказа</p>
              </div>
            </header>

            <div className={styles.content}>
          <div className={styles.stepGroup}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepTitle}>
                Загрузите фотографии <span className={styles.premiumHint}>(До {maxFiles} изображений)</span>
              </span>
            </div>
            
            <div className={styles.uploadArea} onClick={handleFileClick}>
              <div className={styles.uploadIcon}>
                <ImagePlus size={24} />
              </div>
              <span>Загрузить фотографии</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className={styles.hiddenInput} 
                multiple
                accept="image/*"
              />
            </div>

            {files.length > 0 && (
              <div className={styles.fileList}>
                {files.map((fileObj, idx) => (
                  <div key={idx} className={styles.fileItem}>
                    <img src={fileObj.preview} alt={fileObj.name} className={styles.filePreview} />
                    <span className={styles.fileName}>{fileObj.name}</span>
                    {serviceName?.includes('Редактирование') && idx >= 2 && (
                      <span style={{ fontWeight: 700, fontSize: '16px', marginRight: '10px' }}>+ 175₽</span>
                    )}
                    <button className={styles.removeFileBtn} onClick={() => removeFile(idx)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.stepGroup}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepTitle}>Опишите желаемый результат</span>
            </div>
            <textarea 
              className={styles.textarea} 
              placeholder="Опишите какой результат хотели бы увидеть..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.stepGroup}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepTitle}>Укажите контакты для связи</span>
            </div>
            
            <div className={styles.contactSelectors}>
              <div 
                className={`${styles.contactMethod} ${contactMethod === 'telegram' ? styles.contactMethodActive : ''}`}
                onClick={() => setContactMethod('telegram')}
              >
                <div className={styles.contactIconCircle}>
                  <Send size={24} className={contactMethod === 'telegram' ? styles.iconGold : styles.iconGray} />
                </div>
                <span>Telegram</span>
              </div>
              
              <div 
                className={`${styles.contactMethod} ${contactMethod === 'vk' ? styles.contactMethodActive : ''}`}
                onClick={() => setContactMethod('vk')}
              >
                <div className={styles.contactIconCircle}>
                  <div className={contactMethod === 'vk' ? styles.iconGold : styles.iconGray}><VkIcon size={32} /></div>
                </div>
                <span>VK</span>
              </div>

              <div 
                className={`${styles.contactMethod} ${contactMethod === 'email' ? styles.contactMethodActive : ''}`}
                onClick={() => setContactMethod('email')}
              >
                <div className={styles.contactIconCircle}>
                  <Mail size={24} className={contactMethod === 'email' ? styles.iconGold : styles.iconGray} />
                </div>
                <span>Email</span>
              </div>
            </div>

            <input 
              type="text" 
              className={styles.input} 
              placeholder={
                contactMethod === 'telegram' ? 'Введите ваш @username в Telegram' :
                contactMethod === 'vk' ? 'Введите ссылку на профиль VK' :
                'Введите Email'
              } 
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            
            <div className={styles.contactNote}>
              <Lock size={16} className={styles.lockIcon} style={{ marginTop: '2px' }} />
              <div>
                <p>Мы используем контакт только для связи по вашему заказу.</p>
                <p>✎ Правки включены - условия зависят от выбранной услуги.</p>
              </div>
            </div>
          </div>

          <div className={styles.stepGroup}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>4</span>
              <span className={styles.stepTitle}>Оплата заказа</span>
            </div>
            <div className={styles.paymentOptions}>
              <label className={`${styles.paymentOption} ${paymentType === 'full' ? styles.paymentActive : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="full" 
                  checked={paymentType === 'full'} 
                  onChange={() => setPaymentType('full')} 
                  className={styles.hiddenRadio}
                />
                <div className={styles.radioCustom}></div>
                <div className={styles.paymentText}>
                  <strong>Полная оплата</strong>
                  <span>После оплаты ваш заказ поступит в работу</span>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.separator}>
            <Sparkles className={styles.star} size={20} />
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Отправка...' : `Оплатить заказ • ${totalPrice.toLocaleString('ru-RU')} ₽`}
            {!isLoading && <ArrowRight size={20} />}
          </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
