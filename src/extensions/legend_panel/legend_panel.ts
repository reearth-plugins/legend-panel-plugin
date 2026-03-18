import html_main from "@distui/legend_panel/main/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

type WidgetProperty = {
  general?: {
    show_panel_title?: boolean;
    panel_title?: string;
    panel_title_icon?: string;
  };
  legend_items?: {
    item_type?: "legend" | "subtitle";
    item_text?: string;
    legend_symbol_color?: string;
    legend_symbol_image?: string;
  }[];
  appearance?: {
    size?: "normal" | "small";
    width_large?: number;
    width_medium?: number;
    width_small?: number;
    background_color?: string;
    corner_radius?: number;
    show_border?: boolean;
    border_color?: string;
    border_width?: number;
  };
};

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html_main);

// Get message from UI
reearth.extension.on("message", (message: unknown) => {
  const msg = message as { action: string; payload?: any };

  if (msg.action === "init") {
    const widgetProperty = reearth.extension.widget?.property as WidgetProperty;
    reearth.ui.postMessage({
      action: "widgetProperty",
      payload: widgetProperty,
    });
  }
});
