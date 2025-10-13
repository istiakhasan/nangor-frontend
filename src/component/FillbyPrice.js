"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { getBaseUrl } from "../helpers/config/envConfig";
import { instance } from "../helpers/axios/axiosInstance";

const FillByPrice = ({ page }) => {
  const [authorsOptions, setAuthorOptions] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [values, setValues] = useState([100, 500]);
  const MIN = 0;
  const MAX = 1000;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize selected authors from query params
  useEffect(() => {
    const authorIds = searchParams.get("authorIds");
    if (authorIds) {
      const idsArray = authorIds.split(",");
      setSelectedAuthors(idsArray);
    }
  }, [searchParams]);

  // Fetch authors options
  useEffect(() => {
    instance
      .get(`${getBaseUrl()}/authors/options`)
      .then((res) => setAuthorOptions(res?.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle author checkbox change
  const handleAuthorChange = (authorId) => {
    let updatedAuthors = [];
    if (selectedAuthors.includes(authorId)) {
      updatedAuthors = selectedAuthors.filter((id) => id !== authorId);
    } else {
      updatedAuthors = [...selectedAuthors, authorId];
    }
    setSelectedAuthors(updatedAuthors);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedAuthors.length > 0) {
      params.set("authorIds", updatedAuthors.join(",")); // send comma-separated IDs
    } else {
      params.delete("authorIds");
    }

    if (page === "shop") {
      router.push(`/shop/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <div className="sidebar-widget widget-category-2 mb-[15px]">
      <h5 className="section-title style-1 mb-[20px]">Filter by price</h5>

      <div className="list-group-item mb-10 mt-10">
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(v) => {
            setValues(v);
            const params = new URLSearchParams(searchParams.toString());
            params.set("salesPriceMin", v[0].toString());
            params.set("salesPriceMax", v[1].toString());
            if (page === "shop") router.push(`/shop/?${params.toString()}`);
            else router.push(`/?${params.toString()}`);
          }}
          renderTrack={({ props, children }) => {
            const { ref, onMouseDown, onTouchStart, style } = props;
            return (
              <div
                ref={ref}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                style={{
                  ...style,
                  height: "6px",
                  width: "100%",
                  background: "#e0e0e0",
                  borderRadius: "3px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    left: `${(values[0] / MAX) * 100}%`,
                    width: `${((values[1] - values[0]) / MAX) * 100}%`,
                    backgroundColor: "#4d321d",
                    borderRadius: "3px",
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props, index }) => {
            const { ref, style, key, ...rest } = props;
            return (
              <div
                key={key}
                ref={ref}
                {...rest}
                style={{
                  ...style,
                  height: "18px",
                  width: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#4d321d",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                aria-label={`thumb-${index}`}
              />
            );
          }}
        />

        <div className="flex justify-between mt-[15px]">
          <label>
            From: <span className="text-[#4d321d]">${values[0]}</span>
          </label>
          <label>
            To: <span className="text-[#4d321d]">${values[1]}</span>
          </label>
        </div>

        <label className="font-[900] mt-[15px] block text-[#253D4E]">
          Author
        </label>
        <div className="custome-checkbox">
          {authorsOptions?.map((item, i) => (
            <div key={i}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`author-${item.value}`}
                value={item.value}
                checked={selectedAuthors.includes(item.value)}
                onChange={() => handleAuthorChange(item.value)}
              />
              <label
                className="form-check-label"
                htmlFor={`author-${item.value}`}
              >
                <span>{item.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FillByPrice;
