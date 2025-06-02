SELECT
  d.id,
  d.nome AS departamento,
  count(f.id) AS quantidade_funcionarios
FROM
  (
    departamentos d
    LEFT JOIN funcionarios f ON ((d.id = f."departamentoId"))
  )
WHERE
  (f.status = 'ATIVO' :: "StatusFuncionario")
GROUP BY
  d.id,
  d.nome
ORDER BY
  (count(f.id)) DESC;