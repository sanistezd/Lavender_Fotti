'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './OrderModal.module.css';
import { X, ImagePlus, Sparkles, ArrowRight, FileImage, Trash2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function OrderModal({ isOpen, onClose, serviceName }: OrderModalProps) {
  const [files, setFiles] = useState<{file: File, name: string, preview: string}[]>([]);
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'after'
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
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Telegram, WhatsApp или Email..." 
            />
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
                  <span>Вы платите после утверждения (возможно 50% предоплаты)</span>
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
