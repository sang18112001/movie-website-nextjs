import { getWishlist } from '@/app/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import WishlistEmpty from './WishlistEmpty';
import WishlistExist from './WishlistExist';
import { ItemWishlist } from '../../utils/types';

const Wishlist = () => {
  const wishlistState = useSelector(getWishlist);
  const wishlist: ItemWishlist[] = wishlistState.items; // Specify the type as ItemWishlist[]
  return <>{wishlist.length === 0 ? <WishlistEmpty /> : <WishlistExist wishlist={wishlist} />}</>;
};
export default Wishlist;
