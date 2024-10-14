import { Icon } from "./ui/icon";
import type { MyIconos } from "@/Types/types";
import {
  ClipboardList,
  Delete,
  Disc2,
  FileEdit,
  Flashlight,
  FlashlightOff,
  Home,
  List,
  Moon,
  PiggyBank,
  Plus,
  Pocket,
  Settings,
  ShoppingCart,
  Sun,
  SwitchCamera,
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

export function MyIcon({ name, color, size = 24, className, ...props }: MyIconProps) {
  const Icon = getIcon(name);
  if (color) return <Icon color={color} size={size} {...props} />;

  return (
    <Icon
      className={"text-typography-500 dark:text-typography-400 " + className}
      size={size}
      {...props}
    />
  );
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
    case "CameraFlip":
      return CameraFlipIcon;
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
    default:
      return HomeIcon;
  }
}

export const HomeIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Home color={color} size={size} {...props} />;

  return <Icon as={Home} className={classColor} size={size} {...props} />;
};

export const SettingsIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Settings color={color} size={size} {...props} />;
  return <Icon as={Settings} className={classColor} size={size} {...props} />;
};

export const PlusIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Plus color={color} size={size} {...props} />;

  return <Icon as={Plus} className={classColor} size={size} {...props} />;
};

export const ListIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <List color={color} size={size} {...props} />;
  return <Icon as={List} className={classColor} size={size} {...props} />;
};

export const ClipboardListICon = ({ props, color, size = 24 }: Props) => {
  if (color) return <ClipboardList color={color} size={size} {...props} />;

  return <Icon as={ClipboardList} className={classColor} size={size} {...props} />;
};

export const FileEditIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <FileEdit color={color} size={size} {...props} />;

  return <Icon as={FileEdit} className={classColor} size={size} {...props} />;
};
export const PiggyBankIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <PiggyBank color={color} size={size} {...props} />;

  return <Icon as={PiggyBank} className={classColor} size={size} {...props} />;
};

export const CameraFlipIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <SwitchCamera color={color} size={size} {...props} />;

  return <Icon as={SwitchCamera} className={classColor} size={size} {...props} />;
};

export const TorchIcon = ({ variant, props, color, size = 24 }: Props) => {
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

export const DiscIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Disc2 color={color} size={size} {...props} />;

  return <Icon as={Disc2} className={classColor} size={size} {...props} />;
};

export const CloseIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <X color={color} size={size} {...props} />;
  return <Icon as={X} className={classColor} size={size} {...props} />;
};

export const ShopingIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <ShoppingCart color={color} size={size} {...props} />;

  return <Icon as={ShoppingCart} className={classColor} size={size} {...props} />;
};
export const WalletIcon = ({ props, color, size = 24 }: Props) => {
  if (color) return <Pocket color={color} size={size} {...props} />;

  return <Icon as={Pocket} className={classColor} size={size} {...props} />;
};

export const DarkModeIcon = ({ variant, props, color, size = 24 }: Props) => {
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
