import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import ActivityCard from "../components/ActivityCard";
import CategoryFilter from "../components/CategoryFilter";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <div className="flex justify-center text-2xl py-5 md:py-10">
        <h1 className="text-xl md:text-3xl font-semibold">
          Your Next Adventure Starts Here
        </h1>
      </div>
      <div className="flex flex-col md:flex-row px-20 lg:px-30 py-4 gap-10 justify-center md:items-start">
        {/* <div className="flex justify-center md:hidden px-20">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div> */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:w-4/5">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        <div className="hidden w-1/5 sticky top-10 h-fit md:flex">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Activities;
