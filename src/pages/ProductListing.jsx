import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Breadcrumb from "../components/Breadcrumb";
import products from "../data/products";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import "./ProductListing.css";

const ITEMS_PER_PAGE = 8;

export default function ProductListing({ gender, categoryFilter }) {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [gender, category, categoryFilter, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    priceRange,
    selectedCategories,
    selectedRating,
    sortBy,
    gender,
    category,
    searchQuery,
  ]);

  const activeCategory = categoryFilter || category;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (gender) {
      result = result.filter((p) => p.gender === gender);
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    const discountedPrice = (p) => p.price - (p.price * p.discount) / 100;

    result = result.filter((p) => {
      const dp = discountedPrice(p);
      return dp >= priceRange[0] && dp <= priceRange[1];
    });

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => discountedPrice(a) - discountedPrice(b));
        break;
      case "price-high":
        result.sort((a, b) => discountedPrice(b) - discountedPrice(a));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [
    gender,
    activeCategory,
    searchQuery,
    selectedCategories,
    priceRange,
    selectedRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pageTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : gender
      ? `${gender}'s Shoes`
      : activeCategory
        ? `${activeCategory} Shoes`
        : "All Shoes";

  const breadcrumbItems = [{ label: "Home", path: "/" }, { label: pageTitle }];

  const allCategories = ["Sports", "Casual", "Formal"];

  return (
    <div className="listing-page">
      <div className="listing-container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="listing-header">
          <div>
            <h1>{pageTitle}</h1>
            <p>{filteredProducts.length} products found</p>
          </div>
          <div className="listing-header-actions">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="listing-layout">
          <aside className={`filters-sidebar ${showFilters ? "show" : ""}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                <FiX />
              </button>
            </div>

            {!activeCategory && !gender && (
              <div className="filter-group">
                <h4>Category</h4>
                {allCategories.map((cat) => (
                  <label key={cat} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => {
                        setSelectedCategories((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat],
                        );
                      }}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Rating</h4>
              {[4, 3, 2, 1].map((r) => (
                <label key={r} className="filter-checkbox">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === r}
                    onChange={() => setSelectedRating(r)}
                  />
                  <span>{r}★ & above</span>
                </label>
              ))}
              {selectedRating > 0 && (
                <button
                  className="clear-filter-btn"
                  onClick={() => setSelectedRating(0)}
                >
                  Clear
                </button>
              )}
            </div>
          </aside>

          <div className="listing-products">
            {loading ? (
              <div className="products-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="products-grid">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
