import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CafeListView} from '../common/components/CafeListView';
import {COLORS} from '../../resources/colors';
import {INewCafeInfo} from '../common/helpers/replaceCafeList';
import {MapLabelComponent} from '../common/components/homeScreenComponents/MapLabelComponent';
import {LoadingComponent} from '../common/components/LoadingComponent';
import {IconCafeComponent} from '../common/components/homeScreenComponents/IconCafeComponent';
import {MapComponent} from '../common/components/homeScreenComponents/MapComponent';
import {useGetAllCafeMutation} from './api/cafeRequest';

export const HomeScreen: React.FC = () => {
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const isLoading = useTypedSelector(state => state.user.isLoading);
  const image = require('../../resources/images/image_no_coffe.png');
  const [cafeRequest] = useGetAllCafeMutation();

  const [cafeList, setCafeList] = useState<INewCafeInfo[]>([]);
  const [isMap, setIsMap] = useState(false);

  const getAllCafe = useCallback(async (): Promise<void> => {
    await cafeRequest(sessionId)
      .unwrap()
      .then(response => {
        setCafeList(response);
      });
  }, [cafeRequest, sessionId]);

  useEffect(() => {
    getAllCafe();
  }, [getAllCafe]);

  const changeMapLabelPosition = (): void => {
    setIsMap(prevState => !prevState);
  };

  const renderCafeList = ({item}: {item: INewCafeInfo}): JSX.Element => {
    return <CafeListView item={item} />;
  };

  const renderCafeOnMap = (cafeName: string): ReactElement<any, string> => {
    return <IconCafeComponent cafeName={cafeName} />;
  };

  if (isLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        {isMap ? (
          <MapComponent cafeList={cafeList} renderCafeOnMap={renderCafeOnMap} />
        ) : (
          <>
            <View style={styles.indentForMapLabel} />
            {!cafeList.length && (
              <View style={styles.emptyListContainer}>
                <Image source={image} style={styles.imageNoCoffee} />
                <Text style={styles.errorText}>
                  По вашему запросу ничего не найдено
                </Text>
              </View>
            )}
            <FlatList
              data={cafeList}
              renderItem={renderCafeList}
              keyExtractor={item => item.id + item.name}
            />
          </>
        )}
        <MapLabelComponent
          isMap={isMap}
          changeMapLabelPosition={changeMapLabelPosition}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  imageNoCoffee: {
    width: 180,
    height: 180,
    marginLeft: 20,
    marginTop: '22%',
  },
  errorText: {
    color: COLORS.slateGray,
    fontSize: 16,
    marginTop: '24%',
  },
  indentForMapLabel: {
    marginTop: 50,
  },
});
