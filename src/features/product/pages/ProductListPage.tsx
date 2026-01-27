import { MainLayout } from "../../../layout/MainLayout";
import "../../../assets/css/product.css";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../../../api/product.api";
import type { DisplayListingProduct } from "../product.types";
import { Link } from "react-router-dom";

export const ProductListPage = () => {
  const [products, setProducts] = useState<DisplayListingProduct[]>();
  const [isloading,setIsLoading] = useState<boolean>(true);

  const count = useMemo(() => products?.length, [products]);

  useEffect(() => {
    const interval = setInterval(fetchProducts, 1000);
    return () => clearInterval(interval);
  }, [])
  const fetchProducts = async () => {
    try {
      const res: DisplayListingProduct[] = await getAll();
      if (res) {
        setProducts(res);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <MainLayout>
      {isloading ? (<div className="container product-page">
        <h3 className="mb-4 page-title">List Product</h3>

        {/* FILTER */}
        <div className="card filter-card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Search</label>
                <input type="text" className="form-control" placeholder="Enter Name..." />
              </div>

              <div className="col-md-3">
                <label className="form-label">Price range</label>
                <div className="d-flex gap-2">
                  <input type="number" className="form-control" placeholder="Min" />
                  <input type="number" className="form-control" placeholder="Max" />
                </div>
              </div>

              <div className="col-md-2 d-grid">
                <button className="btn btn-dark btn-filter">Filter</button>
              </div>

              <div className="col-md-2 d-grid">
                <Link to={"/home/product-create"} className="btn btn-success btn-filter">Create Product</Link>
              </div>
            </div>
          </div>
        </div>

        {/* SORT */}
        <div className="card sort-card shadow-sm mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <span className="text-muted">Show {count} products</span>
            <select className="form-select w-auto">
              <option>Sắp xếp</option>
              <option>Giá tăng dần</option>
              <option>Giá giảm dần</option>
              <option>Mới nhất</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="row g-4">
          {products?.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div className="card product-card h-100 shadow-sm">
                <div className="img-wrap">
                  <img src={item.image} alt="product" />
                  <span className="badge-discount">{item.size}</span>
                </div>

                <div className="card-body d-flex flex-column">
                  <h6 className="product-name">{item.name}</h6>

                  <div className="mt-auto">
                    <div className="price-box">
                      <span className="price-new">{item.price}</span>
                    </div>

                    <div className="d-grid gap-2 mt-2">
                      <Link to={`/home/product-details/${item.id}`} className="btn btn-outline-dark btn-sm" >Product Detail</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>) : (<Loading />)}
    </MainLayout>
  );
};
