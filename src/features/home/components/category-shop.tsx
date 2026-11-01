"use client";

import { useState } from "react";
import type { StoreCategory } from "@/features/home/types/category";

type CategoryShopProps = {
  categories: StoreCategory[];
  onSelectCategory: (name: string) => void;
};

export default function CategoryShop({
  categories,
  onSelectCategory,
}: CategoryShopProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="category-list">
      {categories.map((category, index) => {
        const hasChildren = category.children.length > 0;
        const isExpanded = expandedId === category.id;
        return (
          <div
            className={`category-card${isExpanded ? " is-expanded" : ""}`}
            key={category.id}
          >
            <div className="category-card-main">
              <button
                type="button"
                className="category-item"
                onClick={() => onSelectCategory(category.name)}
              >
                <span className={`category-art art-${index % 7}`}>
                  {category.imageUrl ? (
                    <img src={category.imageUrl} alt="" />
                  ) : (
                    <span className="category-image-placeholder" aria-hidden="true" />
                  )}
                </span>
                <span>{category.name}</span>
              </button>
              {hasChildren && (
                <button
                  type="button"
                  className={`category-expand${isExpanded ? " is-expanded" : ""}`}
                  aria-label={`${isExpanded ? "Hide" : "Show"} ${category.name} subcategories`}
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedId(isExpanded ? null : category.id)
                  }
                >
                  <span aria-hidden="true">⌄</span>
                </button>
              )}
            </div>
            {hasChildren && isExpanded && (
              <div className="category-submenu">
                {category.children.map((child) => (
                  <button
                    type="button"
                    key={child.id}
                    onClick={() => onSelectCategory(child.name)}
                  >
                    <span className="category-submenu-image">
                      {child.imageUrl ? (
                        <img src={child.imageUrl} alt="" />
                      ) : (
                        <span className="category-image-placeholder" aria-hidden="true" />
                      )}
                    </span>
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
