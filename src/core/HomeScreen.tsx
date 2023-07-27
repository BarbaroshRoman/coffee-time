import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {HeaderComponent} from '../common/components/HeaderComponent';
import {CafeClientRequest, ICafeInfo} from './api/CoffeeRequest';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CafeListView} from '../common/components/CafeListView';
import {COLORS} from '../../resources/colors';
import {navigationHomePages} from '../navigation/components/navigationHomePages';
import {INewCafeInfo, replaceCafeList} from '../common/helpers/replaceCafeList';
import {MapLabelComponent} from '../common/components/MapLabelComponent';
import {LoadingComponent} from '../common/components/LoadingComponent';
import {IconCafeComponent} from '../common/components/IconCafeComponent';
import {MapComponent} from '../common/components/MapComponent';

export const HomeScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const sessionId = useTypedSelector(state => state.user.sessionId);
  const isLoading = useTypedSelector(state => state.user.loading);
  const image = require('../../resources/images/image_no_coffe.png');

  const [cafeList, setCafeList] = useState<INewCafeInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMap, setIsMap] = useState(false);

  useEffect(() => {
    getAllCafe();
  }, []);

  const getAllCafe = useCallback(async (): Promise<void> => {
    const cafeRequest = new CafeClientRequest();

    try {
      const allCafe: ICafeInfo[] | null = await cafeRequest.getAll(sessionId);

      const newCafeList: INewCafeInfo[] | undefined = replaceCafeList(allCafe);
      setCafeList(newCafeList ?? []);
    } catch {
      setErrorMessage('По вашему запросу ничего не найдено');
    }
  }, [sessionId]);

  const goToCafe = (item: INewCafeInfo): void => {
    navigation.navigate(
      navigationHomePages.cafeDetails as never,
      item as never,
    );
  };

  const openDrawer = (): void => {
    navigation.openDrawer();
  };

  const changeMapLabelPosition = (): void => {
    setIsMap(prevState => !prevState);
  };

  const renderCafeList = ({item}: {item: INewCafeInfo}): JSX.Element => {
    return <CafeListView item={item} goToCafe={goToCafe} />;
  };

  const renderCafeOnMap = (cafeName: string): ReactElement<any, string> => {
    return <IconCafeComponent cafeName={cafeName} />;
  };

  if (isLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <View style={styles.container}>
        <HeaderComponent openDrawer={openDrawer} />
        {!cafeList.length && (
          <View style={styles.emptyListContainer}>
            <Image source={image} style={styles.coffeeImage} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        {isMap ? (
          <MapComponent
            cafeList={cafeList}
            renderCafeOnMap={renderCafeOnMap}
            goToCafe={goToCafe}
          />
        ) : (
          <View style={styles.cafeListContainer}>
            <FlatList
              data={cafeList}
              renderItem={renderCafeList}
              keyExtractor={item => item.id + item.name}
            />
          </View>
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
  coffeeImage: {
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
  cafeListContainer: {
    marginTop: 50,
  },
});
