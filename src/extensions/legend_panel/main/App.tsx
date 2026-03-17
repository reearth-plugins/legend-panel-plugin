import useHookes from "./hooks";

function App() {
  const { property, panelStyle, legendGroups } = useHookes();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4" style={panelStyle}>
      {/* Header */}
      {property.general?.show_panel_title && (
        <div className="flex gap-3 items-center">
          {property.general?.panel_title_icon && (
            <img
              src={property.general.panel_title_icon}
              alt="Panel Title Icon"
              className="w-8 h-8 object-contain"
            />
          )}
          <div className="text-lg font-bold text-gray-900">
            {property.general?.panel_title}
          </div>
        </div>
      )}

      {/* Legend Items */}
      {legendGroups?.map((group, groupIndex) =>
        group.legends.length > 0 ? (
          <div key={groupIndex} className="flex flex-col gap-2">
            {group.title && (
              <div className="text-sm text-[#62748E]">{group.title}</div>
            )}
            <div className="flex flex-col gap-1.5">
              {group.legends.map((legend, legendIndex) => (
                <div key={legendIndex} className="flex items-center gap-3">
                  {legend.legend_symbol_image ? (
                    <img
                      src={legend.legend_symbol_image}
                      alt="Legend Symbol"
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-sm shadow-sm shadow-black-300"
                      style={{
                        backgroundColor:
                          legend.legend_symbol_color || "#000000",
                      }}
                    />
                  )}
                  <div className="text-md font-medium text-[#314158]">
                    {legend.legend_text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
}

export default App;
