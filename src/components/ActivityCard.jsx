import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const imageUrl =
    activity.imageUrls && activity.imageUrls.length > 0 && activity.imageUrls[0]
      ? activity.imageUrls[0]
      : "/images/default-activity.jpg";

  return (
    <Link 
      to={`/activities/${activity.id}`}
      className="flex flex-row items-center md:flex-col md:items-start gap-3 rounded-2xl md:rounded-xl overflow-hidden shadow-sm/20 hover:shadow-lg/50 transition duration-300 ease-in-out bg-white p-2 md:p-4">
      <img
        src={imageUrl}
        alt={`Gambar ${activity.title}`}
        className="w-36 h-28 md:w-full md:h-44 object-cover rounded-2xl md:rounded-xl shadow-lg"
        onError={(e) => {
          e.target.onerror = null; // cegah infinite loop
          e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
        }}
      />
      <div className="w-full">
        <h2 className="text-lg font-semibold">{activity.title}</h2>
        <p className="text-sm text-gray-500">{activity.city}, {activity.province}</p>
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
