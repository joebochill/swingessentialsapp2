import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { View, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { H7, Body } from '@pxblue/react-native-components';
import { CollapsibleHeaderLayout } from '../../components';

// Styles
import { sharedStyles } from '../../styles';
import { spaces } from '../../styles/sizes';
import bg from '../../images/bg_2.jpg';

// Constants
import { ROUTES } from '../../constants/routes';

// Utilities
import { getLongDate, makeGroups } from '../../utilities';

// Types
import { ApplicationState } from '../../__types__';

type Lesson = {
    request_id: number;
    dtl_swing: string;
    fo_swing: string;
    request_date: string;
    request_notes: string;
    request_url: string;
    response_notes: string;
    response_status: 'good' | 'rejected' | 'other';
    username: string;
    viewed: boolean;
};

export const Lessons = props => {
    const lessons = useSelector((state: ApplicationState) => state.lessons);
    const myLessons = lessons.pending.concat(lessons.closed);
    const sections = makeGroups(myLessons, (lesson: Lesson) => getLongDate(lesson.request_date));

    return (
        <CollapsibleHeaderLayout title={'Your Lessons'} subtitle={"see how far you've come"} backgroundImage={bg}>
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
                        chevron={true}
                        onPress={() => props.navigation.push(ROUTES.LESSON, { lesson: null })}
                        title={<Body>Welcome to Swing Essentials!</Body>}
                    />
                }
                renderItem={({ item, index }) =>
                    item.response_video ? (
                        <ListItem
                            containerStyle={sharedStyles.listItem}
                            contentContainerStyle={sharedStyles.listItemContent}
                            bottomDivider
                            topDivider={index === 0}
                            chevron={true}
                            onPress={() => props.navigation.push(ROUTES.LESSON, { lesson: item })}
                            title={<Body>{item.request_date}</Body>}
                            rightTitle={!item.viewed ? <H7>NEW</H7> : undefined}
                        />
                    ) : (
                        <ListItem
                            containerStyle={sharedStyles.listItem}
                            contentContainerStyle={sharedStyles.listItemContent}
                            bottomDivider
                            topDivider={index === 0}
                            title={<Body>{item.request_date}</Body>}
                            rightTitle={<H7>IN PROGRESS</H7>}
                        />
                    )
                }
                keyExtractor={(item): string => 'complete_' + item.request_id}
            />
        </CollapsibleHeaderLayout>
    );
};
