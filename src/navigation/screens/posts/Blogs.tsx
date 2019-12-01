import React from 'react';
import { useSelector } from 'react-redux';

import { View, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { H7, Body} from '@pxblue/react-native-components';
import { CollapsibleHeaderLayout } from '../../../components';

import { ROUTES } from '../../../constants/routes';

import bg from '../../../images/bg_4.jpg';
import { spaces } from '../../../styles/sizes';
import { sharedStyles } from '../../../styles';
import { makeGroups } from '../../../utilities/general';

type Blog = {
    id: number;
    date: string;
    body: string;
    title: string;
}

export const Blogs = (props) => {
    const blogs = useSelector(state => state.blogs.blogList);
    const sections = makeGroups(blogs, (blog: Blog) => new Date(blog.date).getUTCFullYear().toString());

    return (
        <CollapsibleHeaderLayout
            title={'19th Hole'}
            subtitle={'...Golf stories and Q&A'}
            backgroundImage={bg}
            // renderScroll={false}
        >
            <SectionList
                renderSectionHeader={({ section: { bucketName, index } }) => (
                    <View style={[sharedStyles.sectionHeader, index > 0 ? { marginTop: spaces.large } : {}]}>
                        <H7>{bucketName}</H7>
                    </View>
                )}
                sections={sections}
                stickySectionHeadersEnabled={false}
                ListEmptyComponent={
                    <ListItem
                        containerStyle={sharedStyles.listItem}
                        contentContainerStyle={sharedStyles.listItemContent}
                        bottomDivider
                        topDivider
                        title={<Body>No Posts Yet!</Body>}
                    />
                }
                renderItem={({ item, index }) =>
                    <ListItem
                        containerStyle={sharedStyles.listItem}
                        contentContainerStyle={sharedStyles.listItemContent}
                        bottomDivider
                        topDivider={index === 0}
                        chevron={true}
                        onPress={() => props.navigation.push(ROUTES.BLOG, {blog: item})}
                        title={<Body>{item.title}</Body>}
                    />
                }
                keyExtractor={(item, index): string => `blog_${item.id}`}
            />
        </CollapsibleHeaderLayout>
    )
};