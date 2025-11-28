// app/(main)/courses/index.tsx

import { useCourses } from "@/hooks/useCourses";
import { FlatList, Image, Text } from "react-native";

export default function CoursesScreen() {
  const { data, isLoading } = useCourses({
    page: 1,
    limit: 10,
    search: "",
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={data?.data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <>
          <Text>{item.title}</Text>
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 200, height: 100 }}
          />
        </>
      )}
    />
  );
}
