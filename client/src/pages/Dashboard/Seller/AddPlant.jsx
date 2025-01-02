import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { imageUpload } from '../../../api/utils'

const AddPlant = () => {
  const { user } = useAuth()
  // const axiosSecure = useAxiosSecure()
  // const [uploadImage, setUploadImage] = useState({
  //   image: { name: 'Upload Button' },
  // })
  // console.log(uploadImage)
  // const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl = await imageUpload(image)

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    // Create plant data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      seller,
      image: imageUrl,
    }

    console.table(plantData)
    // save plant in db
    try {
      // post req
      await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData)
      toast.success('Data Added Successfully!')
    } catch (err) {
      console.log(err)
    } finally {
      // setLoading(false)
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default AddPlant
