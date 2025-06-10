import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import ActivityCard from "../components/ActivityCard";
import CategoryFilter from "../components/CategoryFilter";
import ActivitySearch from "../components/ActivitySearchCard";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let response;
        if (selectedCategory) {
          response = await axiosInstance.get(`/api/v1/activities-by-category/${selectedCategory}`);
        }
        else {
          response = await axiosInstance.get("/api/v1/activities");
        }
        setActivities(response.data.data);
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
      <div className="flex justify-center text-2xl py-5 md:py-10">
        <h1 className="text-xl md:text-3xl md:font-semibold">
          Your Next Adventure Starts Here
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mx-20 lg:mx-40">
        <ActivitySearch search={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        {/* <div className="hidden sticky top-10 h-fit md:flex w-1/2">
        </div> */}
      </div>

      <div className="flex flex-col md:flex-row px-5 md:px-20 py-4 gap-10 justify-center md:items-start">
        {/* <div className="flex justify-center md:hidden px-20">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div> */}
        <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
  
      </div>
    </div>
  );
};

export default Activities;
