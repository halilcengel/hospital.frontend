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
    title: "Ana Sayfa",
    path: "/dashboard/admin",
    icon: (
      <Iconify
        icon="iconamoon:home-duotone"
        sx={{ width: 1, height: 1 }}
      />
    ),
  },
  {
    title: "Hastalar",
    path: "/dashboard/admin/patients",
    icon: <Iconify icon="mdi:patient-outline" />,
  },
  {
    title: "Doktorlar",
    path: "/dashboard/admin/doctors",
    icon: <Iconify icon="fluent:person-pill-20-regular" />,
  },
];

export default drNavConfig;

