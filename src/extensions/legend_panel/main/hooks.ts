import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_PANEL_BACKGROUND_COLOR,
  DEFAULT_PANEL_BORDER_COLOR,
  DEFAULT_PANEL_BORDER_WIDTH,
  DEFAULT_PANEL_CORNER_RADIUS,
} from "./constants";

import { postMsg } from "@/shared/utils";

type MessageFromExtension = {
  action: "widgetProperty";
  payload?: WidgetProperty;
};

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
    size?: "small" | "medium" | "large";
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

type LegendGroups = {
  title?: string;
  legends: {
    legend_text?: string;
    legend_symbol_color?: string;
    legend_symbol_image?: string;
  }[];
}[];

export default () => {
  const [property, setProperty] = useState<WidgetProperty>({});

  const panelStyle = useMemo(() => {
    return {
      backgroundColor:
        property.appearance?.background_color || DEFAULT_PANEL_BACKGROUND_COLOR,
      borderRadius:
        property.appearance?.corner_radius !== undefined
          ? `${property.appearance.corner_radius}px`
          : `${DEFAULT_PANEL_CORNER_RADIUS}px`,
      border: property.appearance?.show_border
        ? `${property.appearance.border_width || DEFAULT_PANEL_BORDER_WIDTH}px solid ${
            property.appearance.border_color || DEFAULT_PANEL_BORDER_COLOR
          }`
        : "none",
    };
  }, [property.appearance]);

  const legendGroups = useMemo(() => {
    const groups: LegendGroups = [];
    let currentGroup: LegendGroups[0] | null = null;

    property.legend_items?.forEach((item) => {
      if (item.item_type === "subtitle") {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = { title: item.item_text, legends: [] };
      } else if (currentGroup) {
        currentGroup.legends.push({
          legend_text: item.item_text,
          legend_symbol_color: item.legend_symbol_color,
          legend_symbol_image: item.legend_symbol_image,
        });
      } else {
        // If there's a legend item before any subtitle, create a default group
        currentGroup = {
          legends: [
            {
              legend_text: item.item_text,
              legend_symbol_color: item.legend_symbol_color,
              legend_symbol_image: item.legend_symbol_image,
            },
          ],
        };
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [property.legend_items]);

  useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      const msg = message.data as MessageFromExtension;

      if (msg.action === "widgetProperty" && msg.payload) {
        setProperty(msg.payload);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    postMsg("init");
  }, []);

  const size = useMemo(() => {
    return property.appearance?.size || "medium";
  }, [property.appearance?.size]);

  return {
    property,
    panelStyle,
    legendGroups,
    size,
  };
};
