'use client';

import { Box, Card, Checkbox, Flex, Stack, Text } from '@sanity/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  type ArrayOfPrimitivesInputProps,
  set,
  unset,
  useFormValue,
} from 'sanity';

export function TagsList(props: ArrayOfPrimitivesInputProps) {
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
  const parent = useFormValue(['pageBuilder.pageBuilder']) as any[] | undefined;
  const regex = /pageBuilder\.pageBuilder\[_key=="([^"]+)"\]/;
  const match = props.id.match(regex);
  const parentId = match ? match[1] : '';

  const foundItem = parent?.find(
    (item) => item._type === 'cards' && item._key === parentId,
  );
  const tags = foundItem?.tags || [];

  const { value = [], onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    value as string[],
  );

  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (isUpdatingRef.current) return;

    const tagsSet = new Set(tags);
    const values = value as string[];
    const filteredOptions = values.filter((item) => tagsSet.has(item));

    if (JSON.stringify(filteredOptions) !== JSON.stringify(values)) {
      isUpdatingRef.current = true;
      onChange(filteredOptions.length ? set(filteredOptions) : unset());
      isUpdatingRef.current = false;

      setSelectedOptions(filteredOptions);
    }
  }, [tags, value, onChange]);

  const handleToggle = useCallback(
    (option: string) => {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions.length ? set(updatedOptions) : unset());
    },
    [selectedOptions, onChange],
  );

  // Show a message if no tags are available
  if (!tags.length) {
    return (
      <Flex height="fill" direction="column" justify="center" align="center">
        <Text>No tags created</Text>
      </Flex>
    );
  }

  return (
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
  );
}
