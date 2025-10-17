local M = {}

function M.remove_extra_double_spaces(s)
  local result = {}
  local last_char = ""
  local space_count = 0

  for i = 1, #s do
    local c = s:sub(i, i)
    if c == " " then
      if space_count < 1 then
        table.insert(result, c)
      end
      space_count = space_count + 1
    else
      table.insert(result, c)
      space_count = 0
    end
  end

  return table.concat(result)
end

return M
