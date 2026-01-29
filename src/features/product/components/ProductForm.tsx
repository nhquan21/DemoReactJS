import { MainLayout } from "../../../layout/MainLayout";
import { useForm } from "react-hook-form";
import type { DisplayListingProduct } from "../product.types";
import { edit, findProduct, save } from "../../../api/product.api";
import type { ApiResponse } from "../../../api/utils/ApiResponse";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DisplayListingProduct>();

    useEffect(() => {
        if (id) {
            if (!id) return;

            const productId = Number(id);
            const res:DisplayListingProduct | undefined = findProduct(productId);

            if (res) {
                reset(res);
            }
        }

    }, [id, reset]);

     const onSubmit = (data: DisplayListingProduct) => {
        let res: ApiResponse<DisplayListingProduct>;

        if (id) {
            res = edit(Number(id), data);
        } else {
            res = save(data);              
        }

        if (res) {
            navigate("/home");
        }
    };

    return (
        <MainLayout>
            <div className="container my-5">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Thêm / Chỉnh sửa sản phẩm</h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-4">

                                {/* NAME */}
                                <div className="col-md-6">
                                    <label className="form-label">Name Product</label>
                                    <input
                                        className="form-control"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                </div>

                                {/* PRICE */}
                                <div className="col-md-6">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("price", { required: true, min: 0 })}
                                    />
                                </div>

                                {/* QUANTITY */}
                                <div className="col-md-6">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("quantity", { required: true, min: 0 })}
                                    />
                                </div>

                                {/* PRODUCT TYPE */}
                                <div className="col-md-6">
                                    <label className="form-label">Product Type</label>
                                    <input
                                        className="form-control"
                                        {...register("productType", { required: true })}
                                    />
                                </div>

                                {/* WARRANTY */}
                                <div className="col-md-6">
                                    <label className="form-label">Warranty (Year)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("warranty")}
                                    />
                                </div>

                                {/* POWER */}
                                <div className="col-md-6">
                                    <label className="form-label">Power(W)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("power")}
                                    />
                                </div>

                                {/* SIZE */}
                                <div className="col-md-6">
                                    <label className="form-label">Size</label>
                                    <select className="form-select" {...register("size")}>
                                        <option value="">-- Chọn size --</option>
                                        <option value="SMALL">Small</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LARGE">Large</option>
                                    </select>
                                </div>

                                {/* MATERIAL */}
                                <div className="col-md-6">
                                    <label className="form-label">Material</label>
                                    <input className="form-control" {...register("material")} />
                                </div>

                                {/* IMAGE */}
                                <div className="col-md-6">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("image")}
                                    />
                                </div>

                                {/* CREATED DATE */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Creation date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        {...register("createdDate")}
                                    />
                                </div>

                            </div>

                            {/* SUBMIT */}
                            <div className="mt-4 text-end">
                                <button className="btn btn-success px-4">Lưu sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
