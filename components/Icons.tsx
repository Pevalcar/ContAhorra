import { Icon } from "./ui/icon";
import type { MyIconos } from "@/Types/types";
import {
  Baby,
  Briefcase,
  Car,
  Carrot,
  ClipboardList,
  Delete,
  Disc2,
  FileEdit,
  Flashlight,
  FlashlightOff,
  HandCoins,
  Home,
  List,
  Minus,
  Moon,
  PawPrint,
  PiggyBank,
  Plus,
  Pocket,
  Rabbit,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Sun,
  SwitchCamera,
  Syringe,
  X,
} from "lucide-react-native";

const classColor = "text-typography-500 dark:text-typography-400";
export interface Props {
  variant?: boolean;
  props?: any;
  color?: string | null;
  size?: number;
  className?: string;
}

interface MyIconProps extends Props {
  name: MyIconos;
}

export function MyIcon({ name, color, size = 24, ...props }: MyIconProps) {
  const Icon = getIcon(name);
  if (color) return <Icon color={color} size={size} {...props} />;

  return <Icon className="text-typography-500 dark:text-typography-400" size={size} {...props} />;
}

function getIcon(name: MyIconos) {
  switch (name) {
    case "Home":
      return HomeIcon;
    case "List":
      return ListIcon;
    case "ClipboardList":
      return ClipboardListICon;
    case "FileEdit":
      return FileEditIcon;
    case "PiggyBank":
      return PiggyBankIcon;
    case "Rabbit":
      return RabbitIcon;
    case "Torch":
      return TorchIcon;
    case "Disc":
      return DiscIcon;
    case "Close":
      return CloseIcon;
    case "Shoping":
      return ShopingIcon;
    case "Wallet":
      return WalletIcon;
    case "DarkMode":
      return DarkModeIcon;
    case "Plus":
      return PlusIcon;
    case "Delete":
      return DeleteICon;
    case "Settings":
      return SettingsIcon;
    case "SwitchCamera":
      return CameraFlipIcon;
    case "LightMode":
      return LightModeIcon;
    case "Paw_Print":
      return Paw_PrintIcon;
    case "Car":
      return CarIcon;
    case "Shopping_Basket":
      return Shopping_BasketIcon;
    case "Minus":
      return MinusIcon;
    case "Carrot":
      return CarrotIcon;
    case "Briefcase":
      return BriefcaseIcon;
    case "Baby":
      return BabyIcon;
    case "Hand_Coins":
      return Hand_CoinsIcon;

    case "Syringe":
      return SyringeIcon;
    default:
      return HomeIcon;
  }
}

const SyringeIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Syringe color={color} size={size} {...props} />;
  return <Icon as={Syringe} className={classColor} size={size} {...props} />;
};

const Hand_CoinsIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <HandCoins color={color} size={size} {...props} />;
  return <Icon as={HandCoins} className={classColor} size={size} {...props} />;
};

const BabyIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Baby color={color} size={size} {...props} />;
  return <Icon as={Baby} className={classColor} size={size} {...props} />;
};

const BriefcaseIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Briefcase color={color} size={size} {...props} />;
  return <Icon as={Briefcase} className={classColor} size={size} {...props} />;
};

const CarrotIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Carrot color={color} size={size} {...props} />;
  return <Icon as={Carrot} className={classColor} size={size} {...props} />;
};

const MinusIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Minus color={color} size={size} {...props} />;
  return <Icon as={Minus} className={classColor} size={size} {...props} />;
};

const Shopping_BasketIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <ShoppingBasket color={color} size={size} {...props} />;
  return <Icon as={ShoppingBasket} className={classColor} size={size} {...props} />;
};

const CarIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Car color={color} size={size} {...props} />;
  return <Icon as={Car} className={classColor} size={size} {...props} />;
};

const Paw_PrintIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <PawPrint color={color} size={size} {...props} />;
  return <Icon as={PawPrint} className={classColor} size={size} {...props} />;
};

const LightModeIcon = ({ props, color, size }: Props) => {
  if (color) return <Sun color={color} size={size} {...props} />;
  return <Icon as={Sun} className={classColor} size={size} {...props} />;
};
const RabbitIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Rabbit color={color} size={size} {...props} />;
  return <Icon as={Rabbit} className={classColor} size={size} {...props} />;
};

const HomeIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Home color={color} size={size} {...props} />;

  return <Icon as={Home} className={classColor} size={size} {...props} />;
};

const SettingsIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Settings color={color} size={size} {...props} />;
  return <Icon as={Settings} className={classColor} size={size} {...props} />;
};

const PlusIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Plus color={color} size={size} {...props} />;

  return <Icon as={Plus} className={classColor} size={size} {...props} />;
};

const ListIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <List color={color} size={size} {...props} />;
  return <Icon as={List} className={classColor} size={size} {...props} />;
};

const ClipboardListICon = ({ props, color, size = 24 }: Props) => {
  if (color) return <ClipboardList color={color} size={size} {...props} />;

  return <Icon as={ClipboardList} className={classColor} size={size} {...props} />;
};

const FileEditIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <FileEdit color={color} size={size} {...props} />;

  return <Icon as={FileEdit} className={classColor} size={size} {...props} />;
};
const PiggyBankIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <PiggyBank color={color} size={size} {...props} />;

  return <Icon as={PiggyBank} className={classColor} size={size} {...props} />;
};

const CameraFlipIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <SwitchCamera color={color} size={size} {...props} />;

  return <Icon as={SwitchCamera} className={classColor} size={size} {...props} />;
};

const TorchIcon = ({ variant, props, color, size = 24 }: Props) => {
  if (color) {
    if (variant) {
      return <Flashlight color={color} size={size} {...props} />;
    }
    return <FlashlightOff color={color} size={size} {...props} />;
  }

  if (variant) {
    return <Icon as={Flashlight} className={classColor} size={size} {...props} />;
  }
  return <Icon as={FlashlightOff} className={classColor} size={size} {...props} />;
};

const DiscIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Disc2 color={color} size={size} {...props} />;

  return <Icon as={Disc2} className={classColor} size={size} {...props} />;
};

const CloseIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <X color={color} size={size} {...props} />;
  return <Icon as={X} className={classColor} size={size} {...props} />;
};

const ShopingIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <ShoppingCart color={color} size={size} {...props} />;

  return <Icon as={ShoppingCart} className={classColor} size={size} {...props} />;
};
const WalletIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Pocket color={color} size={size} {...props} />;

  return <Icon as={Pocket} className={classColor} size={size} {...props} />;
};

const DarkModeIcon = ({ variant, props, color, size = 24 }: Props) => {
  if (color) {
    if (variant) {
      return <Sun color={color} size={size} {...props} />;
    } else {
      return <Moon color={color} size={size} {...props} />;
    }
  }

  if (variant) {
    return <Icon as={Sun} className={classColor} size={size} {...props} />;
  } else {
    return <Icon as={Moon} className={classColor} size={size} {...props} />;
  }
};

const DeleteICon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Delete color={color} size={size} {...props} />;
  return <Icon as={Delete} className={classColor} size={size} {...props} />;
};
