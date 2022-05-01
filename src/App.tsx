import { useState } from "react";
import { useQuery } from "react-query";
//Components
import Item from "./Item/Item";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
//Styles
import { Wrapper, StyledButton } from "./App.styles";
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await(await fetch('https://fakestoreapi.com/products')).json();


const App = () =>{
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
    getProducts
  );


  const getTotalItems = (items : CartItemType[])=>
    items.reduce((ack:number, item) => ack + item.amount, 0)
  ;
  const handleAddToCart = (clickedItem : CartItemType)=>null;
  const handleRemoveFromCart = () => null
  
  if(isLoading) return <LinearProgress />
  if(error) return <div>Someting went wrong....</div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={()=>setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(items => (
          <Grid item key={items.id} xs={12} sm={4}>
            <Item item={items} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
