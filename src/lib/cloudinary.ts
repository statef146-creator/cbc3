export const getCloudinaryUrl = (publicId: string, opts: any = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const { w = 800, h = 600, c = 'fill', q = 'auto', f = 'webp' } = opts
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${w},h_${h},c_${c},q_${q},f_${f}/${publicId}`
}

// Note: For uploads, use a backend proxy to avoid exposing API_SECRET
export const uploadToCloudinary = async (file: File, folder: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'brighter-minds') // Create unsigned preset in Cloudinary
  formData.append('folder', `brighter-minds/${folder}`)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )
  return response.json()
}