import { useRef, useState, ChangeEvent } from "react";
import toast from "react-hot-toast";


interface UseUploadFileProps {
    isImage?: boolean;
}

interface UseUploadFileResult {
    uploadFormData: FormData | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    setUploadFormData: React.Dispatch<React.SetStateAction<FormData | null>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
    imagePreview: string | null;
    onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const supportedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const useUploadFile = ({ isImage = false }: UseUploadFileProps): UseUploadFileResult => {
    const [uploadFormData, setUploadFormData] = useState<FormData | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileInputChange = async ({ target }: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!target.files || target.files.length === 0) return;

        const file = target.files[0];

        const newFile = new File([file], file.name, { type: file.type });

        const formData = new FormData();
        formData.append(file.name, newFile);

        if (isImage) {
            if (!supportedImageTypes.includes(file.type)) {
                toast.error('Only files allowed .png, .jpg, .jpeg, .webp');
                setImagePreview(null);
                return;
            }

            // Handle image preview
            const reader = new FileReader();
            reader.onload = (event) => {
                const readerTarget = event.target;
                if (readerTarget && readerTarget.result) {
                    setImagePreview(readerTarget.result as string);
                }
            };
            reader.onerror = () => toast.error('Error when trying to load image');
            reader.readAsDataURL(file);
        }

        setUploadFormData(formData);
    };

    return {
        uploadFormData,
        fileInputRef,
        imagePreview,
        setUploadFormData,
        setImagePreview,
        onFileInputChange,
    };
};
