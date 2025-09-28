import {
  FoldersIcon,
  HouseIcon,
  DiamondsFourIcon,
  SmileySadIcon,
  ImageBrokenIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  FileTextIcon,
  ClipboardTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarDotsIcon,
  ClockIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

const iconList = {
  home: HouseIcon,
  profile: UserIcon,
  folder: FoldersIcon,
  edit: PencilIcon,
  delete: TrashIcon,
  title: FileTextIcon,
  description: ClipboardTextIcon,
  plus: PlusIcon,
  grid: DiamondsFourIcon,
  sadEmoji: SmileySadIcon,
  broken: ImageBrokenIcon,
  search: MagnifyingGlassIcon,
  calendar: CalendarDotsIcon,
  clock: ClockIcon,
  location: MapPinIcon,
};

export const getIcon = (icon) => {
  const IconFromList = iconList[icon];
  if (!IconFromList) return iconList["broken"];
  return icon ? IconFromList : null;
};
