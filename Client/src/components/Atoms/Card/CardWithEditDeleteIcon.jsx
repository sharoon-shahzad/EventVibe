import React from "react";
import Card from "./Card";
import { getIcon } from "@/utils/helpers/iconsHelper";
import IconContainerButton from "../Buttons/IconContainerButton";
import { H4, SubHeading } from "../Shared/headings";

const CardWithEditDeleteIcon = ({
  title,
  description,
  date,
  duration,
  name: companyName,
  onEdit,
  onDelete,
  showActions = true,
  rounded,
  grayText,
  grayBg,
  TitleIcon,
}) => {
  const DescriptionIcon = getIcon("description");
  const DateIcon = getIcon("date");
  const DurationIcon = getIcon("duration");
  const CompanyIcon = getIcon("company");
  const EditIcon = getIcon("edit");
  const DeleteIcon = getIcon("delete");

  return (
    <Card rounded={rounded}>
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          {/* Content section */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {title && (
              <div className="flex items-center gap-2">
                {TitleIcon && <TitleIcon size={20} />}
                <H4>{title}</H4>
              </div>
            )}

            {companyName && (
              <div className="flex items-center gap-2">
                <CompanyIcon size={18} />
                <SubHeading>{companyName}</SubHeading>
              </div>
            )}

            {description && (
              <div className="flex items-start gap-2">
                {DescriptionIcon && (
                  <DescriptionIcon size={18} className="mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm lg:text-base font-thin">{description}</p>
              </div>
            )}

            {date && (
              <div className="flex items-center gap-2">
                {DateIcon && <DateIcon size={16} />}
                <p className="text-xs sm:text-sm text-gray-500">{date}</p>
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-2">
                {DurationIcon && <DurationIcon size={18} />}
                <p className="text-xs sm:text-sm lg:text-base">{duration}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {showActions && (onEdit || onDelete) && (
            <div className="flex gap-2 self-end sm:self-auto">
              {onEdit && EditIcon && (
                <IconContainerButton
                  onClick={onEdit}
                  IconComponent={EditIcon}
                  primary
                  background={grayBg}
                  icon={grayText}
                />
              )}
              {onDelete && DeleteIcon && (
                <IconContainerButton
                  onClick={onDelete}
                  IconComponent={DeleteIcon}
                  primary
                  background={grayBg}
                  icon={grayText}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardWithEditDeleteIcon;
