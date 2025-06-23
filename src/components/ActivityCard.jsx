import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const imageUrl =
    activity.imageUrls && activity.imageUrls.length > 0 && activity.imageUrls[0]
      ? activity.imageUrls[0]
      : "/images/default-activity.jpg";

  return (
    <Link 
      to={`/activities/${activity.id}`}
      className="flex flex-row md:flex-col rounded-3xl md:rounded-xl overflow-hidden shadow-lg hover:shadow-lg/50 transition duration-300 ease-in-out bg-white p-2">
      <img
        src={imageUrl}
        alt={`Gambar ${activity.title}`}
        className="w-40 md:w-full h-40 md:h-48 object-cover rounded-3xl md:rounded-xl"
        onError={(e) => {
          e.target.onerror = null; // cegah infinite loop
          e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{activity.title}</h2>
        <p className="text-sm text-gray-500">{activity.city}, {activity.province}</p>
        {/* <p className="text-sm mt-1 line-clamp-2">{activity.description}</p> */}
        <div className="mt-2 flex flex-col md:flex-row md:justify-between md:items-center">
          <span className="block md:hidden text-yellow-500">⭐ {activity.rating}</span>
          <span className="text-blue-600 font-bold">
            Rp{activity.price.toLocaleString("id-ID")}
          </span>
          <span className="hidden md:block text-yellow-500">⭐ {activity.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
