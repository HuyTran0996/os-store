import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { useSelector } from "react-redux";

import "../styles/SingleProduct.scss";
import { useThunk } from "../hook/use-thunk";

import {
  getAllProduct,
  getAProduct,
  rating,
  toggleWishlist,
} from "../store/thunks/fetchProduct";
import { userWishList } from "../store/thunks/fetchUsers";

import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import CarouselShow from "../components/CarouselShow";

import Container from "../components/Container";

import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import imageNotFound from "../images/imageNotFound.png";

const SingleProduct = () => {
  const params = useParams();
  const [star, setStar] = useState(3);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bestProduct, setBestProduct] = useState([]);
  const [img, setImg] = useState(imageNotFound);

  const [getAProductById] = useThunk(getAProduct);
  const [getDataAllProduct] = useThunk(getAllProduct);
  const [ratingProduct] = useThunk(rating);
  const [toggleUserWishlist] = useThunk(toggleWishlist);
  const [getUserWishList] = useThunk(userWishList);

  const { dataAllProduct, dataProduct } = useSelector((state) => {
    return state.products;
  });
  const { dataUserWishList } = useSelector((state) => {
    return state.users;
  });

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const getData = async (action) => {
    try {
      setIsLoading(true);
      await action;
      await getAProductById(params.id);
      setBestProduct(await getDataAllProduct(`sort=-sold&page=1`));
      if (parsedUserData && !parsedUserData.note) {
        await getUserWishList();
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setImg(dataProduct?.images?.[0].url || imageNotFound);
  }, [dataProduct]);

  const product = Object.keys(dataProduct).length > 0 ? dataProduct : [];
  const props = {
    zoomWidth: 300,
    zoomHeight: 300,
    zoomPosition: "original",
    img: img,
  };
  const sizes = product.variant?.filter((v) => {
    return v.tag === "size";
  });
  const colors = product.variant?.filter((v) => {
    return v.tag === "color";
  });

  //note: ratingChanged is default function of ReactStars
  const ratingChanged = (newRating) => {
    setStar(newRating);
  };
  const sendComment = (e) => {
    e.preventDefault();
    getData(ratingProduct({ star, prodId: params.id, comment }));
  };

  const handelUserWishList = async () => {
    if (!parsedUserData) {
      return showToast("Please Login", "error");
    }
    if (parsedUserData.note === "Your Section Is Expired") {
      return showToast("Your Section Is Expired", "error");
    }
    if (parsedUserData && !parsedUserData.note) {
      try {
        setIsLoading(true);
        await toggleUserWishlist({ prodId: params.id });
        await getUserWishList();
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const checkIfWish = dataUserWishList.find((item) => item._id === params.id);

  return (
    <div className="singleProductPage">
      <Meta title={product?.title} />
      <BreadCrumb title={product?.title} />
      {isLoading ? <Loading message="Loading..." /> : ""}

      <Box className="main-product-wrapper">
        <div className="images">
          <div className="imageZoom">
            <ReactImageZoom {...props} />
          </div>

          <div className="other-product-images">
            {product.images && (
              <CarouselShow addStyle={"prodPage"}>
                {product?.images?.map((img, index) => (
                  <div
                    key={`prod-${index}`}
                    onClick={() => setImg(img.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={img.url} alt="watch" className="img-fluid" />
                  </div>
                ))}
              </CarouselShow>
            )}
          </div>
        </div>

        <div className="main-product-detail">
          <div className="title">
            <h3>{product?.title}</h3>
          </div>

          <div className="price">
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product?.price)}
            </p>

            <div className="rating">
              <ReactStars
                count={5}
                value={product?.totalrating}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />

              <p className="t-review">({product?.ratings?.length} reviews)</p>
            </div>
            <a className="review-btn" href="#review">
              Write a review
            </a>
          </div>

          <div className="bottom">
            <div className="items">
              <h3 className="product-heading">Brand:</h3>
              <p className="product-data">{product?.brand}</p>
            </div>

            <div className="items">
              <h3 className="product-heading">Category:</h3>
              <p className="product-data">{product?.category}</p>
            </div>

            <div className="items">
              <h3 className="product-heading">Availability:</h3>
              <p className="product-data">{product?.quantity}</p>
            </div>

            {/* variant */}
            <div className="variants">
              <h3 className="product-heading">Size:</h3>

              <div className="wrapper">
                {sizes?.map((s, index) => {
                  return (
                    <span key={`size-${index}`} className="size">
                      {s.variantName}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="variants">
              <h3 className="product-heading">Color:</h3>
              {/* <Color /> */}
              <div className="wrapper">
                {colors?.map((c) => {
                  return (
                    <div
                      onClick={() => setImg(c.images[0].url)}
                      className="color"
                      style={{
                        backgroundColor: c.colorCode,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="function">
              <div className="quantity">
                <h3 className="product-heading">Quantity:</h3>

                <input type="number" min={1} max={10} defaultValue={1} />
              </div>

              <div className="buttonGroup">
                <button disabled={isLoading} className="button" type="submit">
                  Add To Cart
                </button>
                <button disabled={isLoading} className="button buyNow">
                  Buy It Now
                </button>
              </div>
            </div>

            <div className="compareWish">
              <button disabled={isLoading}>
                <TbGitCompare className="icon" />
                Add To Compare
              </button>

              <button disabled={isLoading} onClick={handelUserWishList}>
                {checkIfWish ? (
                  <>
                    <FaHeart style={{ color: "red" }} className="icon" />{" "}
                    Wishlisted
                  </>
                ) : (
                  <>
                    <AiOutlineHeart className="icon" />
                    Add To Wishlist
                  </>
                )}
              </button>
            </div>

            <div className="policy">
              <h3 className="product-heading">Shipping & Return:</h3>
              <p className="product-data">
                Free shipping and returns available on all orders! <br />
                We ship all US domestic orders within
                <b>5-10 business days!</b>
              </p>
            </div>
          </div>
        </div>
      </Box>

      {/* Description */}

      <Box className="description-wrapper px">
        <h4>Description:</h4>
        <div>
          <p>{product?.description}</p>
        </div>
      </Box>

      {/* review */}

      <Box className="review-wrapper px">
        <h4 id="review">Reviews:</h4>
        <div className="review-inner-wrapper">
          <div className="review-form">
            <h4>Write a review</h4>
            <form onSubmit={sendComment}>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                value={star}
                edit={true}
                size={24}
                activeColor="#ffd700"
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment..."
                rows={4}
              />

              <div className="submitButton">
                <button disabled={isLoading} className="button" type="submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>

          <div className="reviews">
            <h4>Customer Reviews</h4>
            <div className="review">
              {product.ratings?.map((rating, index) => (
                <div key={`review-${index}`}>
                  <div className="nameAndStar">
                    <h6 className="name">{rating.postedby.name}</h6>
                    <ReactStars
                      count={5}
                      value={rating.star}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>

                  <p className="comment">{rating.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>

      {/* Popular Products */}
      <Box className="popular-wrapper">
        <h3 className="section-heading">Our Popular Products</h3>

        <CarouselShow>
          {bestProduct.products?.length > 0 &&
            bestProduct.products?.map((prod, index) => (
              <ProductCard key={`best-${index}`} prod={prod} />
            ))}
        </CarouselShow>
      </Box>
    </div>
  );
};

export default SingleProduct;
