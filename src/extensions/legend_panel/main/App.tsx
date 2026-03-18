import { useEffect } from "react";

import useHookes from "./hooks";

function App() {
  const { property, panelStyle, legendGroups, size } = useHookes();

  // Size-based class configurations
  const symbolSize = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const titleTextSize = size === "small" ? "text-base" : "text-lg";
  const subtitleTextSize = size === "small" ? "text-xs" : "text-sm";
  const legendTextSize = size === "small" ? "text-sm" : "text-md";
  const itemGap = size === "small" ? "gap-2" : "gap-3";
  const legendGap = size === "small" ? "gap-1" : "gap-1.5";

  // Update html and body width based on size
  useEffect(() => {
    const width = size === "small" ? "300px" : "363px";
    document.documentElement.style.width = width;
    document.body.style.width = width;
  }, [size]);

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
      {legendGroups?.map((group, groupIndex) =>
        group.legends.length > 0 ? (
          <div key={groupIndex} className="flex flex-col gap-2">
            {group.title && (
              <div className={`${subtitleTextSize} text-[#62748E]`}>
                {group.title}
              </div>
            )}
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
                      className={`${symbolSize} rounded-sm shadow-sm shadow-black-300`}
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
          </div>
        ) : null,
      )}

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
