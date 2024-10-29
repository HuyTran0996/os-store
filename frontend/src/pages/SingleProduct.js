import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Rating } from "@mui/material";
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
import { updateCompareList, updateCartList } from "../store/thunks/fetchUsers";

import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import CarouselShow from "../components/CarouselShow";

import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import imageNotFound from "../images/imageNotFound.png";

const SingleProduct = () => {
  const params = useParams();
  const [star, setStar] = useState(3);
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checkIfWish, setCheckIfWish] = useState(false);
  const [checkIfCart, setCheckIfCart] = useState(false);
  const [bestProduct, setBestProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [img, setImg] = useState(imageNotFound);

  const [checkIfCompare, setCheckIfCompare] = useState(false);
  const [variantUser, setVariantUser] = useState("");

  const [getAProductById] = useThunk(getAProduct);
  const [getDataAllProduct] = useThunk(getAllProduct);
  const [ratingProduct] = useThunk(rating);
  const [toggleUserWishlist] = useThunk(toggleWishlist);
  const [updateCompareListUser] = useThunk(updateCompareList);
  const [updateCartListUser] = useThunk(updateCartList);

  const { dataProduct } = useSelector((state) => {
    return state.products;
  });

  const { dataUserWishList, dataUserCompare, dataUserCart } = useSelector(
    (state) => {
      return state.users;
    }
  );

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const getData = async (action) => {
    try {
      setIsLoading(true);
      await action;
      await getAProductById(params.id);
      setBestProduct(await getDataAllProduct(`sort=-sold&page=1`));
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
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    setCheckIfCompare(compareList.findIndex((item) => item.id === params.id));
  }, [dataUserCompare]);

  useEffect(() => {
    setCheckIfWish(dataUserWishList.find((item) => item._id === params.id));
  }, [dataUserWishList]);

  useEffect(() => {
    setCheckIfCart(
      dataUserCart.findIndex((item) => item.product?._id === params.id)
    );
    setCart([...dataUserCart]);
  }, [dataUserCart]);

  useEffect(() => {
    setImg(dataProduct?.images?.[0].url || imageNotFound);
    setPrice(dataProduct.price);
  }, [dataProduct]);

  const props = {
    // zoomWidth: 300,
    // zoomHeight: 300,
    zoomPosition: "original",
    img: img,
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
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleCart = () => {
    const checkIfAdd = cart.findIndex((item) => item.product._id === params.id);
    if (checkIfAdd >= 0) {
      cart.splice(checkIfAdd, 1);
    } else {
      cart.push({ product: { _id: params.id }, count: 1 });
    }
    updateCartListUser(cart);
    localStorage.setItem("userCart", JSON.stringify(cart));
  };

  const handleToggleCompare = () => {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    const checkIfAdd = compareList.findIndex((item) => item.id === params.id);
    if (checkIfAdd >= 0) {
      compareList.splice(checkIfAdd, 1);
    } else {
      compareList.push({ id: params.id });
    }

    updateCompareListUser(compareList);

    localStorage.setItem("compareList", JSON.stringify(compareList));
  };

  const title = dataProduct.title;
  const imgCarousel = dataProduct.images;
  const totalRating = dataProduct.totalrating * 1;
  const ratings = dataProduct.ratings || [];
  const brand = dataProduct.brand;
  const category = dataProduct.category;
  const quantity = dataProduct.quantity;
  const sizes = dataProduct.variant?.filter((v) => {
    return v.tag === "size";
  });
  const colors = dataProduct.variant?.filter((v) => {
    return v.tag === "color";
  });
  const variants = dataProduct.variant?.filter((v) => {
    return v.tag === "variant";
  });
  const description = dataProduct.description;

  const handleChangeImgAndPrice = (p) => {
    setVariantUser(p._id);
    setImg(p.images[0].url);
    setPrice(p.price);
  };

  return (
    <div className="singleProductPage">
      <Meta title={title} />
      <BreadCrumb title={title} />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <>
          <Box className="main-product-wrapper">
            <div className="images">
              <div className="imageZoom">
                <ReactImageZoom {...props} />
              </div>

              <div className="other-product-images">
                {imgCarousel && (
                  <CarouselShow addStyle={"prodPage"}>
                    {imgCarousel.map((img, index) => (
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
                <h3>{title}</h3>
              </div>

              <div className="price">
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(price)}
                </p>

                <div className="rating">
                  <Rating value={totalRating} precision={0.5} readOnly />

                  <p className="t-review">({ratings.length} reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a review
                </a>
              </div>

              <div className="bottom">
                <div className="items">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data">{brand}</p>
                </div>

                <div className="items">
                  <h3 className="product-heading">Category:</h3>
                  <p className="product-data">{category}</p>
                </div>

                <div className="items">
                  <h3 className="product-heading">Availability:</h3>
                  <p className="product-data">{quantity}</p>
                </div>

                {/* variant */}
                <div className="variants">
                  <h3 className="product-heading">Variant:</h3>
                  <div className="wrapper">
                    {variants?.map((v, index) => {
                      return (
                        <span
                          key={`variant-${index}`}
                          className="size"
                          onClick={() => handleChangeImgAndPrice(v)}
                          style={{
                            border:
                              variantUser === v._id ? "3px solid aqua" : "",
                          }}
                        >
                          {v.variantName}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="variants">
                  <h3 className="product-heading">Size:</h3>
                  <div className="wrapper">
                    {sizes?.map((s, index) => {
                      return (
                        <span
                          key={`size-${index}`}
                          className="size"
                          onClick={() => handleChangeImgAndPrice(s)}
                          style={{
                            border:
                              variantUser === s._id ? "3px solid aqua" : "",
                          }}
                        >
                          {s.variantName}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="variants">
                  <h3 className="product-heading">Color:</h3>
                  <div className="wrapper">
                    {colors?.map((c, index) => {
                      return (
                        <div
                          key={`color-${index}`}
                          onClick={() => handleChangeImgAndPrice(c)}
                          className="color"
                          style={{
                            backgroundColor: c.colorCode,
                            border:
                              variantUser === c._id ? "3px solid aqua" : "",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="function">
                  {/* <div className="quantity">
                    <h3 className="product-heading">Quantity:</h3>

                    <input type="number" min={1} max={10} defaultValue={1} />
                  </div> */}

                  <div className="buttonGroup">
                    <button
                      onClick={handleToggleCart}
                      disabled={isLoading}
                      className="button"
                      type="submit"
                    >
                      {checkIfCart >= 0 ? "Added To Cart" : "Add To Cart"}
                    </button>

                    <button disabled={isLoading} className="button buyNow">
                      Buy It Now
                    </button>
                  </div>
                </div>

                <div className="compareWish">
                  <button onClick={handleToggleCompare} disabled={isLoading}>
                    <TbGitCompare
                      style={checkIfCompare >= 0 ? { color: "red" } : ""}
                      className="icon"
                    />

                    {checkIfCompare >= 0
                      ? " Added To Compare"
                      : " Add To Compare"}
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
              <p>{description}</p>
            </div>
          </Box>

          {/* review */}

          <Box className="review-wrapper px">
            <h4 id="review">Reviews:</h4>
            <div className="review-inner-wrapper">
              <div className="review-form">
                <h4>Write a review</h4>
                <form onSubmit={sendComment}>
                  <Rating
                    value={star}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setStar(newValue);
                    }}
                  />

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment..."
                    rows={4}
                    required
                  />

                  <div className="submitButton">
                    <button
                      disabled={isLoading}
                      className="button"
                      type="submit"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>

              <div className="reviews">
                <h4>Customer Reviews</h4>
                <div className="review">
                  {ratings.map((rating, index) => (
                    <div key={`review-${index}`}>
                      <div className="nameAndStar">
                        <h6 className="name">{rating.postedby.name}</h6>

                        <Rating value={rating.star} precision={0.5} readOnly />
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
        </>
      )}
    </div>
  );
};

export default SingleProduct;
