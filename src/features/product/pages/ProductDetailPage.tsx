import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../../../layout/MainLayout";
import type { DisplayListingProduct } from "../product.types";
import { useEffect, useState } from "react";
import { findProduct } from "../../../api/product.api";

export const ProductDetailPage = () => {
  const [product, setProduct] = useState<DisplayListingProduct>()
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const productId = Number(id);
    const res = findProduct(productId);

    if (res) setProduct(res);
  }, [id]);

  return (
    <MainLayout>
      <div className="container my-5">
        <div className="row g-5">

          {/* IMAGE SECTION */}
          <div className="col-lg-6">
            <div className="border rounded p-3 bg-light text-center">
              <img
                src={product?.image}
                alt={product?.name}
                className="img-fluid"
                style={{ maxHeight: "450px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">{product?.name}</h2>

            <h3 className="text-danger mb-3">
              {product?.price.toLocaleString()} đ
            </h3>

            <div className="mb-2"><strong>Loại sản phẩm:</strong> {product?.productType}</div>
            <div className="mb-2"><strong>Chất liệu:</strong> {product?.material}</div>
            <div className="mb-2"><strong>Kích thước:</strong> {product?.size}</div>
            <div className="mb-2"><strong>Công suất:</strong> {product?.power} W</div>
            <div className="mb-2"><strong>Bảo hành:</strong> {product?.warranty} tháng</div>

            <div className="mb-3">
              <strong>Tồn kho: </strong>
              {/* {product?.quantity   > 0 ? (
                <span className="text-success">Còn hàng</span>
              ) : (
                <span className="text-danger">Hết hàng</span>
              )} */}
            </div>

            {/* BUTTONS */}
            <div className="d-flex gap-3 mt-4">
              {/* <button
                className="btn btn-primary px-4"
                disabled={product?.quantity === 0}
              >
                🛒 Thêm vào giỏ
              </button> */}

              <Link to={`/product-edit/${product?.id}`} className="btn btn-outline-danger px-4">
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 p-4 border rounded shadow-sm bg-white">
          <h4 className="mb-3">Mô tả sản phẩm</h4>
          <p className="text-muted">
            {product?.name} thuộc dòng {product?.productType}, được làm từ {product?.material},
            công suất {product?.power}W, kích thước {product?.size}.
            Sản phẩm bảo hành {product?.warranty} tháng.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
