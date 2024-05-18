import { useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Collapse,
  Box,
} from '@mui/material'
import { RecipeGridItem } from '../../types'
import './RecipeGrid.css' 
import { motion } from 'framer-motion';

interface RecipeGridProps {
  items: RecipeGridItem[]
  customClass?: string
}

export default function RecipeGrid({ items = [], customClass }: RecipeGridProps) {
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({})

  const handleFlip = (id: string) => {
    setIsFlipped((prevState) => ({ ...prevState, [id]: !prevState[id] }))
  }

  return (
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
    <Container sx={{marginTop: 5}}>
      <Grid container spacing={2} className={customClass}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                    onClick={() => handleFlip(item.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
                <Collapse in={!isFlipped[item.id]}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time to Cook: {item.cookTime} minutes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This recipe contains ✨{item.nutrient}✨
                    </Typography>
                    <Button size="small" onClick={() => handleFlip(item.id)}>
                      {item.frontButtonText}
                    </Button>
                  </CardContent>
                </Collapse>
                <Collapse in={isFlipped[item.id]}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Ingredients & Instructions
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>Ingredients:</strong>
                      <ul>
                        {item.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>Instructions:</strong>
                      <ol>
                        {item.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </Typography>
                    <Button size="small" onClick={() => handleFlip(item.id)}>
                      {item.backButtonText}
                    </Button>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No items to display</Typography>
        )}
      </Grid>
    </Container>
    </motion.div>
  )
}
