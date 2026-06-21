import { useState, memo, useCallback } from 'react';

const BRANDS = ['Porsche', 'Toyota', 'Lexus', 'Mercedes', 'Cupra', 'BMW'];
const TYPES = ['Sport', 'SUV', 'Supercar'];

const PRICE_MIN = 0;
const PRICE_MAX = 800000;
const PRICE_STEP = 5000;

const KM_MIN = 0;
const KM_MAX = 50000;
const KM_STEP = 1000;

function formatPrice(v) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
}

function formatKm(v) {
  return `${v.toLocaleString('es-ES')} km`;
}

function AccordionSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-accordion__item">
      <button className="filter-accordion__trigger" onClick={() => setOpen((p) => !p)}>
        {title}
        <span className={`filter-accordion__chevron ${open ? 'open' : ''}`} />
      </button>
      {open && <div className="filter-accordion__body">{children}</div>}
    </div>
  );
}

function DualRangeSlider({ min, max, step, from, to, onFromChange, onToChange, format }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const handleFrom = useCallback((e) => {
    const val = Math.min(Number(e.target.value), to - step);
    onFromChange(val);
  }, [to, step, onFromChange]);

  const handleTo = useCallback((e) => {
    const val = Math.max(Number(e.target.value), from + step);
    onToChange(val);
  }, [from, step, onToChange]);

  return (
    <div className="dual-range">
      <div className="dual-range__track-wrap">
        <div className="dual-range__track">
          <div
            className="dual-range__fill"
            style={{ left: `${pct(from)}%`, width: `${pct(to) - pct(from)}%` }}
          />
        </div>
        <input
          type="range"
          className="dual-range__input"
          min={min} max={max} step={step}
          value={from}
          onChange={handleFrom}
        />
        <input
          type="range"
          className="dual-range__input"
          min={min} max={max} step={step}
          value={to}
          onChange={handleTo}
        />
      </div>
      <div className="dual-range__labels">
        <div>
          <div className="dual-range__label">Desde</div>
          <div className="dual-range__value">{format(from)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="dual-range__label">Hasta</div>
          <div className="dual-range__value">{format(to)}</div>
        </div>
      </div>
    </div>
  );
}

const FilterBar = memo(function FilterBar({
  filters, onBrandToggle, onTypeToggle, onPriceChange, onKmChange,
  onReset, search, onSearchChange, allCars,
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <span className="filter-sidebar__title">Filtros</span>
        <button className="filter-sidebar__reset" onClick={onReset}>Eliminar filtros</button>
      </div>

      <input
        className="filter-search"
        type="text"
        placeholder="Buscar por marca, modelo..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="filter-accordion">

        {/* MARCA — brand chips multi-select */}
        <AccordionSection title="Marca">
          <div className="brand-chips">
            {BRANDS.map((brand) => {
              const count = allCars.filter((c) => c.brand === brand).length;
              const selected = filters.brands.includes(brand);
              return (
                <button
                  key={brand}
                  className={`brand-chip-filter ${selected ? 'selected' : ''}`}
                  onClick={() => onBrandToggle(brand)}
                >
                  <span className="brand-chip-filter__name">{brand}</span>
                  <span className="brand-chip-filter__count">{count}</span>
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* TIPO — chips multi-select */}
        <AccordionSection title="Tipo de vehículo">
          <div className="brand-chips">
            {TYPES.map((type) => {
              const count = allCars.filter((c) => c.type === type).length;
              const selected = filters.types.includes(type);
              return (
                <button
                  key={type}
                  className={`brand-chip-filter ${selected ? 'selected' : ''}`}
                  onClick={() => onTypeToggle(type)}
                >
                  <span className="brand-chip-filter__name">{type}</span>
                  <span className="brand-chip-filter__count">{count}</span>
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* KILÓMETROS — dual range */}
        <AccordionSection title="Kilómetros">
          <DualRangeSlider
            min={KM_MIN} max={KM_MAX} step={KM_STEP}
            from={filters.kmRange[0]} to={filters.kmRange[1]}
            onFromChange={(v) => onKmChange([v, filters.kmRange[1]])}
            onToChange={(v) => onKmChange([filters.kmRange[0], v])}
            format={formatKm}
          />
        </AccordionSection>

        {/* PRECIO — dual range */}
        <AccordionSection title="Precio">
          <DualRangeSlider
            min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP}
            from={filters.priceRange[0]} to={filters.priceRange[1]}
            onFromChange={(v) => onPriceChange([v, filters.priceRange[1]])}
            onToChange={(v) => onPriceChange([filters.priceRange[0], v])}
            format={formatPrice}
          />
        </AccordionSection>

      </div>
    </aside>
  );
});

export default FilterBar;
