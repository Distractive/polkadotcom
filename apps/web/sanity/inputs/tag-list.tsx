"use client"

import { useCallback, useEffect, useState } from "react"
import { Box, Card, Checkbox, Flex, Stack, Text } from "@sanity/ui"
import {
  set,
  unset,
  useFormValue,
  type ArrayOfPrimitivesInputProps,
} from "sanity"

/**
This is a custom input for getting tags from the parent
*/
export function TagsList(props: ArrayOfPrimitivesInputProps) {
  const parent = useFormValue(["pageBuilder.pageBuilder"]) as any[]
  const regex = /pageBuilder\.pageBuilder\[_key=="([^"]+)"\]/
  const match = props.id.match(regex)
  const parentId = match ? match[1] : ""
  const tags = parent.find(
    (item) => item._type === "cards" && item._key === parentId
  ).tags
  const { value = [], onChange } = props
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    value as string[]
  )

  useEffect(() => {
    const tagsSet = new Set(tags)
    const values = value as string[]
    const filteredOptions = values.filter((item) => tagsSet.has(item))

    onChange(filteredOptions ? set(filteredOptions) : unset())
  }, [tags, value, onChange])

  const handleToggle = useCallback(
    (option: string) => {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option]

      setSelectedOptions(updatedOptions)

      onChange(updatedOptions ? set(updatedOptions) : unset())
    },
    [selectedOptions, onChange]
  )

  return !tags ? (
    <Flex height="fill" direction="column" justify="center" align="center">
      <Text>No tags created</Text>
    </Flex>
  ) : (
    <Stack space={2}>
      <Card padding={3} border>
        {tags.map((option: string) => (
          <Flex key={option} align="center" padding={1}>
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={() => handleToggle(option)}
            />
            <Box flex={1} paddingLeft={2}>
              <Text>{option}</Text>
            </Box>
          </Flex>
        ))}
      </Card>
    </Stack>
  )
}
