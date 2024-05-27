import Iconify from "./src/components/Iconfiy";
import SvgColor from "./src/components/SvgColor";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const drNavConfig = [
  {
    title: "Randevularım",
    path: "/dashboard/doctor",
    icon: <Iconify icon="lets-icons:date-range-duotone" sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Hastalıklar",
    path: "/dashboard/doctor/diagnostics",
    icon: <Iconify icon="ph:virus-duotone" sx={{ width: 1, height: 1 }} />,
  },
];

export default drNavConfig;

