import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { API } from "@orderly.network/types";
import { TradingPage } from "@orderly.network/trading";
import { updateSymbol } from "@/utils/storage";
import { formatSymbol, generatePageTitle } from "@/utils/utils";
import { useOrderlyConfig } from "@/utils/config";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";

// Per Vanta product spec:
// - Only show [assets, orderEntry] panels (remove standalone margin/risk panel)
// - Risk rate is shown inside the account (assets) panel after deposit
// - Layout is fixed after first deposit (no dragging)
const ORDERLY_SORT_KEYS = "orderly:order_entry_sort_keys";
const VANTA_PRE_SORT = ["assets", "orderEntry"];

function initVantaLayout() {
  try {
    const current = localStorage.getItem(ORDERLY_SORT_KEYS);
    // Always enforce Vanta layout (2 panels only, no margin module)
    const parsed = current ? JSON.parse(current) : null;
    const hasMargin = parsed && Array.isArray(parsed) && parsed.includes("margin");
    if (hasMargin || !parsed) {
      localStorage.setItem(ORDERLY_SORT_KEYS, JSON.stringify(VANTA_PRE_SORT));
    }
  } catch {
    localStorage.setItem(ORDERLY_SORT_KEYS, JSON.stringify(VANTA_PRE_SORT));
  }
}

// Run immediately on module load
initVantaLayout();

export default function PerpSymbol() {
  const params = useParams();
  const [symbol, setSymbol] = useState(params.symbol!);
  const config = useOrderlyConfig();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    updateSymbol(symbol);
    // Re-enforce layout on each mount (in case user cleared storage)
    initVantaLayout();
  }, [symbol]);

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      const symbol = data.symbol;
      setSymbol(symbol);
      
      const searchParamsString = searchParams.toString();
      const queryString = searchParamsString ? `?${searchParamsString}` : '';
      
      navigate(`/perp/${symbol}${queryString}`);
    },
    [navigate, searchParams]
  );

  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle(formatSymbol(params.symbol!));

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <TradingPage
        symbol={symbol}
        onSymbolChange={onSymbolChange}
        tradingViewConfig={config.tradingPage.tradingViewConfig}
        sharePnLConfig={config.tradingPage.sharePnLConfig}
      />
    </>
  );
}
