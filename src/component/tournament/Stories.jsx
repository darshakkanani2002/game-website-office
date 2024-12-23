import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { Img_Url, Test_API } from "../Config";

export default function Stories() {
    const [categories, setCategories] = useState([]); // For categories
    const [stories, setStories] = useState([]); // For stories
    const [selectedCategory, setSelectedCategory] = useState("all"); // Default to "All Stories"

    // Fetch categories on component mount
    useEffect(() => {
        axios.get(`${Test_API}category/details`)
            .then((response) => {
                const fetchedCategories = response.data.data;
                setCategories([{ _id: "all", name: "All Stories", icon: "" }, ...fetchedCategories]);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error.response ? error.response.data : error.message);
            });
    }, []);

    // Fetch stories based on the selected category
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const payload = { vCatId: selectedCategory === "all" ? '' : selectedCategory };
                const response = await axios.post(`${Test_API}story/list`, payload);

                console.log("story data ==>", response.data.data);
                setStories(response.data.data);
            } catch (error) {
                console.error("Error fetching stories:", error.response ? error.response.data : error.message);
            }
        };

        fetchStories();
    }, [selectedCategory]);

    return (
        <div>
            <div className="background-height-bg overflow-auto">
                <div>
                    <div className="container-fluid">
                        <div className="row align-items-start">
                            {/* Sidebar with category buttons */}
                            <div className="col-4 position-sticky ps-1 pe-1 py-2 bg-white nav-tabs-position">
                                <div className="">
                                    <div
                                        className="nav flex-column nav-pills me-3"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                    >
                                        {categories.map((category) => (
                                            <button
                                                key={category._id}
                                                className={`nav-link py-3 text-start ${selectedCategory === category._id ? "active" : ""}`}
                                                onClick={() => setSelectedCategory(category._id)}
                                                role="tab"
                                                aria-selected={selectedCategory === category._id}
                                            >
                                                {category.vIcon && typeof category.vIcon === 'string' ? (
                                                    <img
                                                        crossOrigin="anonymous"
                                                        src={`${Img_Url}${category.vIcon}`}
                                                        className="img-fluid me-2 stories-icon"
                                                        alt={category.name}
                                                    />
                                                ) : null}
                                                {category.vName || category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            {/* Stories content */}
                            <div className="col-8 story-margin">
                                <div
                                    className="tab-content"
                                    id="v-pills-tabContent"
                                    role="tabpanel"
                                >
                                    <div
                                        className="tab-pane fade show active"
                                        id={`v-pills-${selectedCategory}`}
                                        role="tabpanel"
                                    >
                                        <div className="row">
                                            {stories.map((story) => (
                                                <div className="col-12 mb-3" key={story._id}>
                                                    <Link to={`/story/${story.vCatId || 'all'}`}>
                                                        <div>
                                                            <img
                                                                crossOrigin="anonymous"
                                                                src={`${Img_Url}${story.vImage}`}
                                                                alt={story.title}
                                                                className="w-100 mb-2 story-big-img"
                                                            />
                                                            <div>
                                                                <h4 className="text-black">{story.title}</h4>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
