import Iconify from "./src/components/Iconfiy";
import SvgColor from "./src/components/SvgColor";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Randevularım",
    path: "/dashboard/patient",
    icon: <Iconify icon="lets-icons:date-range-duotone" sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Randevu Al",
    path: "/dashboard/patient/randevu",
    icon: <Iconify icon="zondicons:date-add" sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;

