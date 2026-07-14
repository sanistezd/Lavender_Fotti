'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './OrderModal.module.css';
import { X, ImagePlus, Sparkles, ArrowRight, FileImage, Trash2, Send, Mail, Lock } from 'lucide-react';

const VkIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.2 6.54c.2-.68 0-1.18-.9-1.18h-2.68c-.76 0-1.1.4-1.28.84 0 0-1.36 3.32-3.28 5.46-.62.62-.9.8-1.28.8-.2 0-.32-.2-.32-.8V6.54c0-.76-.22-1.18-.92-1.18h-3.4c-.52 0-.84.38-.84.74 0 .78 1.18.96 1.3 3.16v4.78c0 .96-.18 1.14-.56 1.14-.98 0-3.38-3.34-4.8-7.16-.3-.86-.6-1.2-1.36-1.2H1.6C.74 6.54.56 6.94.56 7.38c0 .8 1.02 4.74 4.76 9.98 2.48 3.56 5.96 5.48 9.12 5.48 1.9 0 2.12-.42 2.12-1.16v-2.68c0-.86.18-1.04.8-1.04.46 0 1.24.24 3.08 2.02 2.1 2.1 2.46 3.04 3.6 3.04h2.68c.86 0 1.28-.42 1.04-1.26-.28-.84-1.32-2.14-2.7-3.68-.76-.9-1.9-1.88-2.24-2.32-.48-.6-.36-.86 0-1.42 0 0 3.96-5.58 4.38-7.46z" />
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFiles([]); // Reset files when modal opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPremium = serviceName?.includes('Premium');

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
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    const fileToRemove = files[indexToRemove];
    if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

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
                Загрузите фотографии <span className={styles.premiumHint}>(можно несколько)</span>
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
                  <div className={contactMethod === 'vk' ? styles.iconGold : styles.iconGray}><VkIcon size={24} /></div>
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
            />
            
            <div className={styles.contactNote}>
              <Lock size={16} className={styles.lockIcon} />
              <p>Мы используем контакт только для связи по вашему заказу.</p>
            </div>
          </div>

          <div className={styles.stepGroup}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>4</span>
              <span className={styles.stepTitle}>Выберите вариант оплаты</span>
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
                  <strong>Оплатить сразу 100%</strong>
                  <span>Приоритетное выполнение заказа</span>
                </div>
              </label>

              <label className={`${styles.paymentOption} ${paymentType === 'after' ? styles.paymentActive : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="after" 
                  checked={paymentType === 'after'} 
                  onChange={() => setPaymentType('after')} 
                  className={styles.hiddenRadio}
                />
                <div className={styles.radioCustom}></div>
                <div className={styles.paymentText}>
                  <strong>Оплата после результата</strong>
                  <span>Вы платите после утверждения</span>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.separator}>
            <Sparkles className={styles.star} size={20} />
          </div>

          <button className={styles.submitBtn}>
            {paymentType === 'full' ? 'Оплатить онлайн' : 'Отправить заявку'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
