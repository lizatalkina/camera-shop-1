import { commerce, datatype, image, name } from 'faker';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';

export const makeFakeCamera = (): Camera => ({
  id: Math.random() * 10000,
  name: commerce.product(),
  vendorCode: datatype.uuid(),
  type: commerce.productMaterial(),
  category: commerce.productAdjective(),
  description: commerce.productDescription(),
  level: commerce.productAdjective(),
  rating: datatype.number({min: 0, max: 5}),
  price: Number(commerce.price()),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
  reviewCount: datatype.number({min: 1, max: 1000})
} as Camera);

export const makeFakePromo = (): Promo => ({
  id: Math.random() * 10000,
  name: commerce.product(),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
} as Promo);

export const makeFakeReview = (cameraId: number) => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  advantage: commerce.productAdjective(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productDescription(),
  rating: datatype.number({ min: 0, max: 5 }),
  createAt: String(datatype.datetime()),
  dateTyped: datatype.datetime(),
  cameraId: cameraId,
} as Review);
