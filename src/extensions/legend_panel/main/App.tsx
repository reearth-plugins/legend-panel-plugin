import { useEffect } from "react";

import useHookes from "./hooks";

function App() {
  const { property, panelStyle, legendGroups, size } = useHookes();

  // Size-based class configurations
  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          symbolSize: "w-4 h-4",
          symbolBorderRadius: "rounded",
          titleTextSize: "text-sm",
          subtitleTextSize: "text-xs",
          legendTextSize: "text-xs",
          itemGap: "gap-1.5",
          legendGap: "gap-1",
          width: "250px",
        };
      case "medium":
        return {
          symbolSize: "w-6 h-6",
          symbolBorderRadius: "rounded-sm",
          titleTextSize: "text-base",
          subtitleTextSize: "text-xs",
          legendTextSize: "text-sm",
          itemGap: "gap-2",
          legendGap: "gap-1",
          width: "300px",
        };
      case "large":
      default:
        return {
          symbolSize: "w-8 h-8",
          symbolBorderRadius: "rounded-md",
          titleTextSize: "text-lg",
          subtitleTextSize: "text-sm",
          legendTextSize: "text-md",
          itemGap: "gap-3",
          legendGap: "gap-1.5",
          width: "363px",
        };
    }
  };

  const {
    symbolSize,
    symbolBorderRadius,
    titleTextSize,
    subtitleTextSize,
    legendTextSize,
    itemGap,
    legendGap,
    width: defaultWidth,
  } = getSizeConfig();

  // Use manual width if set, otherwise use default from size
  const width =
    property.appearance?.width !== undefined
      ? `${property.appearance.width}px`
      : defaultWidth;

  // Update html and body width based on size
  useEffect(() => {
    document.documentElement.style.width = width;
    document.body.style.width = width;
  }, [width]);

  // Check if we have initial data but no legend items
  const hasInitialData = Object.keys(property).length > 0;
  const hasNoLegendItems =
    !property.legend_items || property.legend_items.length === 0;
  const showEmptyTip = hasInitialData && hasNoLegendItems;

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4" style={panelStyle}>
      {/* Header */}
      {property.general?.show_panel_title && (
        <div className={`flex ${itemGap} items-center`}>
          {property.general?.panel_title_icon && (
            <img
              src={property.general.panel_title_icon}
              alt="Panel Title Icon"
              className={`${symbolSize} object-contain`}
            />
          )}
          <div className={`${titleTextSize} font-bold text-gray-900`}>
            {property.general?.panel_title}
          </div>
        </div>
      )}

      {/* Legend Items */}
      {legendGroups?.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-2">
          {group.title && (
            <div className={`${subtitleTextSize} text-[#62748E]`}>
              {group.title}
            </div>
          )}
          {group.legends.length > 0 ? (
            <div className={`flex flex-col ${legendGap}`}>
              {group.legends.map((legend, legendIndex) => (
                <div
                  key={legendIndex}
                  className={`flex items-center ${itemGap}`}
                >
                  {legend.legend_symbol_image ? (
                    <img
                      src={legend.legend_symbol_image}
                      alt="Legend Symbol"
                      className={`${symbolSize} object-contain`}
                    />
                  ) : (
                    <div
                      className={`${symbolSize} ${symbolBorderRadius} shadow-sm shadow-black-300 shrink-0`}
                      style={{
                        backgroundColor:
                          legend.legend_symbol_color || "#000000",
                      }}
                    />
                  )}
                  <div
                    className={`${legendTextSize} font-medium text-[#314158]`}
                  >
                    {legend.legend_text}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}

      {/* Empty state tip */}
      {showEmptyTip && (
        <div className="text-xs text-gray-400 text-center">
          No legend items configured
        </div>
      )}
    </div>
  );
}

export default App;
