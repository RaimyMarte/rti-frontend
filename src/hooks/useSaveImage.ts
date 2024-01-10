import { isMutationSuccessResponse } from '../helpers';
import { useUploadFile } from '.';
import toast from 'react-hot-toast';

interface UseSaveImageInterface {
    elementId: string
    uploadApiFn: any
}

export const useSaveImage = ({ uploadApiFn, elementId }: UseSaveImageInterface) => {
    const {
        uploadFormData,
        fileInputRef,
        imagePreview,
        onFileInputChange,
        setUploadFormData,
        setImagePreview,
    } = useUploadFile({
        isImage: true
    })

    const onSaveImage = async () => {
        try {
            if (!elementId) {
                toast.error('Id is needed');
                return
            }

            const response = await uploadApiFn({ formData: uploadFormData!, id: elementId });
console.log(response)
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message)
                    setUploadFormData(null);
                    setImagePreview(null);
                    return;
                }

                toast.success(respData?.message)
                setUploadFormData(null);
                setImagePreview(null);
                window.location.reload()
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    }

    return {
        onSaveImage,
        fileInputRef,
        imagePreview,
        onFileInputChange,
    }
}
