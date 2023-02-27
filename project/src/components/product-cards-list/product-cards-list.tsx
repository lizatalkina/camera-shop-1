import ProductCard from '../../components/product-card/product-card';
import { Camera } from '../../types/camera';

type ListProps = {
  cameras: Camera[];
}

function ProductCardsList (props: ListProps): JSX.Element {
  const { cameras } = props;
  return (
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
          <div className="product-card" key={camera.id} data-testid="product-card">
            <ProductCard camera = { camera }/>
          </div>
        ))
      }
    </div>
  );
}

export default ProductCardsList;
