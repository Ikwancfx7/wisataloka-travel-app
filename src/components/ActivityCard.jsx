import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const imageUrl =
    activity.imageUrls && activity.imageUrls.length > 0 && activity.imageUrls[0]
      ? activity.imageUrls[0]
      : "/images/default-activity.jpg";

  return (
    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-lg/20 transition duration-300">
      <img
        src={imageUrl}
        alt={activity.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null; // cegah infinite loop
          e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{activity.title}</h2>
        <p className="text-sm text-gray-500">{activity.city}, {activity.province}</p>
        {/* <p className="text-sm mt-1 line-clamp-2">{activity.description}</p> */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            Rp{activity.price.toLocaleString("id-ID")}
          </span>
          <span className="text-yellow-500">⭐ {activity.rating}</span>
        </div>
        <Link
          to={`/activities/${activity.id}`}
          className="text-blue-600 hover:underline mt-5"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
