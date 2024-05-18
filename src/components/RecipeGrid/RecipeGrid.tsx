import { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Modal,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { RecipeGridItem } from '../../types'
import './RecipeGrid.css'
import { motion } from 'framer-motion'

interface RecipeGridProps {
  items: RecipeGridItem[]
  // customClass?: string
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function RecipeGrid({
  items: recipes = [], 
  // customClass,
}: RecipeGridProps) {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : {}
  })

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeGridItem | null>(null) 

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prevState) => ({ ...prevState, [id]: !prevState[id] }))
  }

  const handleOpenModal = (recipe: RecipeGridItem) => { 
    setSelectedRecipe(recipe) 
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedRecipe(null) 
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Grid container spacing={2} >
          {Array.isArray(recipes) && recipes.length > 0 ? ( 
            recipes.map((recipe) => ( 
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card sx={{ position: 'relative' }}>
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      height="140"
                      image={recipe.image} 
                      alt={recipe.name} 
                      onClick={() => handleOpenModal(recipe)} 
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                  <IconButton
                    onClick={() => toggleFavorite(recipe.id)} 
                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                  >
                    {favorites[recipe.id] ? ( 
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {recipe.name} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.description} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time to Cook: {recipe.cookTime} minutes 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This recipe contains ✨{recipe.nutrient}✨ 
                    </Typography>
                    <Button size="small" onClick={() => handleOpenModal(recipe)}> 
                      {recipe.frontButtonText} 
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No items to display</Typography>
          )}
        </Grid>

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            {selectedRecipe && ( 
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ingredients & Instructions
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Ingredients:</strong>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => ( 
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Instructions:</strong>
                  <ol>
                    {selectedRecipe.instructions.map((instruction, index) => ( 
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </Typography>
                <Button size="small" onClick={handleCloseModal}>
                  {selectedRecipe.backButtonText} 
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </motion.div>
  )
}
