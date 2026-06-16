import { useState, useMemo, useEffect } from "react";
import '../Listadeclientes.css';
import { listar_clientes } from '../../services/listaclientes';

const PER_PAGE = 6;

function initials(nome) {
  return nome.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function formatDate(d) {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function Badge({ estado }) {
  return (
    <span className={`cl-badge cl-badge--${estado.toLowerCase()}`}>
      {estado}
    </span>
  );
}

function Avatar({ nome }) {
  return (
    <div className="cl-avatar">
      {initials(nome)}
    </div>
  );
}

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("nome");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchClientes() {
      try {
        setLoading(true);
        const response = await listar_clientes();
        setClientes(response.data ?? []);
      } catch (e) {
        setErro("Erro ao carregar clientes. Verifique a conexão com a API.");
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return clientes
      .filter((c) =>
        !q ||
        [c.nome, c.email, c.cpf, c.cidade, c.estado, c.bairro, c.celular].some(
          (v) => v && v.toLowerCase().includes(q)
        )
      )
      .sort((a, b) => {
        const va = a[sortKey] || "";
        const vb = b[sortKey] || "";
        return sortAsc ? va.localeCompare(vb, "pt") : vb.localeCompare(va, "pt");
      });
  }, [query, sortKey, sortAsc, clientes]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function handleSort(key) {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(true); }
    setPage(1);
  }

  function handleSearch(e) {
    setQuery(e.target.value);
    setPage(1);
  }

  const SortIcon = ({ k }) => (
    <span className="cl-sort-icon">
      {sortKey === k ? (sortAsc ? "↑" : "↓") : "↕"}
    </span>
  );

  const Th = ({ label, k }) => (
    <th
      onClick={() => handleSort(k)}
      className={`cl-th ${sortKey === k ? "cl-th--active" : ""}`}
    >
      {label}
      <SortIcon k={k} />
    </th>
  );

  if (loading) {
    return (
      <div className="cl-wrap">
        <div className="cl-empty">Carregando clientes...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="cl-wrap">
        <div className="cl-empty cl-empty--erro">{erro}</div>
      </div>
    );
  }

  return (
    <div className="cl-wrap">

      {/* Topo */}
      <div className="cl-top">
        <div className="cl-search-box">
          <svg className="cl-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Buscar por nome, email, CPF, cidade..."
            className="cl-search-input"
          />
        </div>
        <div className="cl-stats">
          <span className="cl-stat">Total: <strong>{clientes.length}</strong></span>
          <span className="cl-stat">Exibindo: <strong>{filtered.length}</strong></span>
        </div>
      </div>

      {/* DESKTOP: tabela */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <Th label="Nome" k="Nome" />
              <Th label="Email" k="Email" />
              <Th label="Celular" k="Celular" />
              <Th label="CPF" k="CPF" />
              <Th label="Cidade" k="Cidade" />
              <Th label="UF" k="Estado" />
              <Th label="Nascimento" k="Data_nasc" />
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={7} className="cl-empty">Nenhum cliente encontrado</td>
              </tr>
            ) : (
              slice.map((c, i) => (
                <tr key={i} className="cl-tr">
                  <td className="cl-td">
                    <div className="cl-name-cell">
                      <Avatar nome={c.Nome || "?"} />
                      <span>{c.Nome}</span>
                    </div>
                  </td>
                  <td className="cl-td cl-td--muted">{c.Email}</td>
                  <td className="cl-td">{c.Celular || "—"}</td>
                  <td className="cl-td cl-td--small">{c.CPF}</td>
                  <td className="cl-td">{c.Cidade}</td>
                  <td className="cl-td"><Badge estado={c.Estado || "?"} /></td>
                  <td className="cl-td cl-td--small">{formatDate(c.Data_nasc)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE: cards */}
      <div className="cl-cards">
        {slice.length === 0 ? (
          <div className="cl-empty">Nenhum cliente encontrado</div>
        ) : (
          slice.map((c, i) => (
            <div key={i} className="cl-card">
              <div className="cl-card-header">
                <Avatar nome={c.Nome || "?"} />
                <div className="cl-card-info">
                  <p className="cl-card-name">{c.Nome}</p>
                  <p className="cl-card-email">{c.Email}</p>
                </div>
                <Badge estado={c.Estado || "?"} />
              </div>
              <div className="cl-card-grid">
                <div className="cl-field"><label>CPF</label><span>{c.CPF}</span></div>
                <div className="cl-field"><label>Celular</label><span>{c.Celular || "—"}</span></div>
                <div className="cl-field"><label>Cidade</label><span>{c.Cidade}</span></div>
                <div className="cl-field"><label>Nascimento</label><span>{formatDate(c.Data_nasc)}</span></div>
                <div className="cl-field cl-field--full">
                  <label>Endereço</label>
                  <span>{c.Endereco}, {c.Numero}{c.Complemento ? ` — ${c.Complemento}` : ""} · {c.Bairro}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="cl-pagination">
          <span className="cl-page-info">
            {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} de {filtered.length}
          </span>
          <div className="cl-page-btns">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="cl-page-btn">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`cl-page-btn ${p === currentPage ? "cl-page-btn--active" : ""}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="cl-page-btn">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
