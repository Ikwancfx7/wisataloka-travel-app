import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getActivityById } from "../api/ActivityApi";
import { getPromoById } from "../api/PromoApi";
import { getTransactionById } from "../api/PaymentApi";

const Breadcrumb = () => {
  const location = useLocation();
  const [dynamicLabel, setDynamicLabel] = useState('');
  const pathnames = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const fetchDynamicLabel = async () => {
      const lastSegment = pathnames[pathnames.length - 1];

      if (location.pathname.includes("/activities/")) {
        const data = await getActivityById(lastSegment);
        setDynamicLabel(data.title);
      } else if (location.pathname.includes("/promo/")) {
        const data = await getPromoById(lastSegment);
        setDynamicLabel(data.title);
      } else if (location.pathname.includes("/transaction/")) {
        const data = await getTransactionById(lastSegment);
        setDynamicLabel("Invoice #" + data.invoiceId);
      } else {
        setDynamicLabel(lastSegment);
      }
    };

    fetchDynamicLabel();
  }, [location]);

  return (
    <nav className="max-w-screen-xl mx-auto flex items-center text-sm text-gray-600 mb-4 space-x-1">
      <Link to="/" className="flex items-center text-blue-700 hover:text-blue-800 cursor-pointer font-medium">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>

      {pathnames.map((segment, i) => {
        const routeSegments = pathnames.slice(0, i + 1);
  
        if (routeSegments[0] === "transaction") {
            routeSegments[0] = "transactions";
        }

        const correctedSegment = segment === "transaction" ? "transactions" : segment;
        const routeTo = "/" + pathnames.slice(0, i + 1).map(s => s === "transaction" ? "transactions" : s).join("/");

        // const routeTo = "/" + pathnames.slice(0, i + 1).join("/");
        const isLast = i === pathnames.length - 1;

        return (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
            //   <span className="font-semibold">{capitalize(dynamicLabel) || capitalize(segment)}</span>
              <span className="font-semibold capitalize">{dynamicLabel || correctedSegment}</span>
            ) : (
              <Link to={routeTo} className="cursor-pointer capitalize">
                {correctedSegment === "transaction" ? "transactions" : correctedSegment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;