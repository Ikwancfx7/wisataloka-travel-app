import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import CategoryFilter from "../components/CategoryFilter";
import ActivitySearch from "../components/ActivitySearchCard";
import { getActivities, getActivityByCategory } from "../api/ActivityApi";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/BreadCrump";

const Activities = () => {
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery || null);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let response;
        if (selectedCategory) {
          response = await getActivityByCategory(selectedCategory);
        }
        else {
          response = await getActivities();
        }
        setActivities(response);
      } catch (error) {
        console.error("Gagal mengambil data aktivitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [selectedCategory]);


  const filteredActivities = activities.filter((activity) => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()
  ));

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <div className="hidden md:block pt-25 px-20">
        <Breadcrumb />
      </div>
      <div className="bg-gray-50 px-5 min-h-screen py-20 md:py-0 md:pb-20 pb-25">
        <div className="flex justify-center mb-5 md:mb-10">
          <h1 className="text-xl md:text-3xl md:font-semibold">
            Your Next Adventure Starts Here
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 mb-5 ">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <div className="hidden md:flex">
            <ActivitySearch search={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>

        <div className="flex justify-center">
          {filteredActivities.length === 0 && <p>No activities found.</p>}
          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
