"use client";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-card text-foreground rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-md py-10 px-2 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl transition"
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
