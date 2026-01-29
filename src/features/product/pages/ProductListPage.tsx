import { MainLayout } from "../../../layout/MainLayout";
import "../../../assets/css/product.css";
import { useEffect, useMemo, useState } from "react";
import type { DisplayListingProduct } from "../product.types";
import { Link } from "react-router-dom";
import { getAll } from "../../../api/product.api";

type ProductQuery = {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "ASC" | "DESC" | "NEW";
};
export const ProductListPage = () => {
  const [allProducts, setAllProducts] = useState<DisplayListingProduct[]>([]);
  const [query, setQuery] = useState<ProductQuery>({});

  // Load toàn bộ sản phẩm 1 lần
  useEffect(() => {
    const data = getAll(); // local data
    setAllProducts(data);
  }, []);

  // Hàm update query dùng chung
  const updateQuery = <K extends keyof ProductQuery>(
    key: K,
    value: ProductQuery[K]
  ) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  // FILTER + SORT LOCAL
  const products = useMemo(() => {
    let result = [...allProducts];

    // Search theo tên
    if (query.keyword) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.keyword!.toLowerCase())
      );
    }

    // Lọc theo giá
    if (query.minPrice != null) {
      result = result.filter((p) => p.price >= query.minPrice!);
    }

    if (query.maxPrice != null) {
      result = result.filter((p) => p.price <= query.maxPrice!);
    }

    // Sort
    if (query.sortBy === "ASC") {
      result.sort((a, b) => a.price - b.price);
    }

    if (query.sortBy === "DESC") {
      result.sort((a, b) => b.price - a.price);
    }

    if (query.sortBy === "NEW") {
      result.sort(
        (a, b) =>
          new Date(b.createdDate).getTime() -
          new Date(a.createdDate).getTime()
      );
    }

    return result;
  }, [allProducts, query]);
  return (
    <MainLayout>
      <div className="container product-page">
        <h3 className="mb-4 page-title">List Product</h3>
        {/* FILTER */}
        <div className="card filter-card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Search</label>
                <input type="text" className="form-control" placeholder="Enter Name..."
                  value={query.keyword ?? ""}
                  onChange={(e) => updateQuery("keyword", e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Price range</label>
                <div className="d-flex gap-2">
                  <input type="number" className="form-control" placeholder="Min"
                    onChange={(e) => updateQuery("minPrice", Number(e.target.value))}
                  />
                  <input type="number" className="form-control" placeholder="Max"
                    onChange={(e) => updateQuery("maxPrice", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="col-md-2 d-grid">
                <Link to={"/product-create"} className="btn btn-success btn-filter">Create Product</Link>
              </div>
            </div>
          </div>
        </div>

        {/* SORT */}
        <div className="card sort-card shadow-sm mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <span className="text-muted">Show {products.length} products</span>
            <select
              className="form-select w-auto"
              onChange={(e) => updateQuery("sortBy", e.target.value as any)}
            >
              <option value="">Sort by</option>
              <option value="ASC">Price: Low to High</option>
              <option value="DESC">Price: High to Low</option>
              <option value="NEW">Newest</option>
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
                      <Link to={`/product-details/${item.id}`} className="btn btn-outline-dark btn-sm" >Product Detail</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
